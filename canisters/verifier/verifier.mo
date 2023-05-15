import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Timer "mo:base/Timer";
import Buffer "mo:base/Buffer";
import Type "Types";
import Ic "Ic";

actor class Verifier() {
    type StudentProfile = Type.StudentProfile;

    let studentProfileStore = HashMap.HashMap<Principal, StudentProfile>(0, Principal.equal, Principal.hash);

    private func isRegistered(p : Principal) : Bool {
        var xProfile : ?StudentProfile = studentProfileStore.get(p);

        switch (xProfile) {
            case null {
                return false
            };

            case (?profile) {
                return true
            }
        }
    };

    // STEP 1 - BEGIN

    public shared ({ caller }) func addMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err "You must be Logged In"
        };

        if (isRegistered(caller)) {
            return #err("You are already registered (" # Principal.toText(caller) # ") ")
        };

        studentProfileStore.put(caller, profile);
        return #ok()
    };

    public shared query ({ caller }) func seeAProfile(p : Principal) : async Result.Result<StudentProfile, Text> {
        var xProfile : ?StudentProfile = studentProfileStore.get(p);

        switch (xProfile) {
            case null {
                return #err("There is no profile registered with the received account")
            };

            case (?profile) {
                return #ok profile
            }
        }
    };

    public shared ({ caller }) func updateMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err "You must be Logged In"
        };

        if (not isRegistered(caller)) {
            return #err("You are not registered")
        };

        ignore studentProfileStore.replace(caller, profile);

        return #ok()
    };

    public shared ({ caller }) func deleteMyProfile() : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err "You must be Logged In"
        };

        if (not isRegistered(caller)) {
            return #err("You are not registered")
        };

        studentProfileStore.delete(caller);

        return #ok()
    };

    // STEP 2 - BEGIN
    public type TestResult = Type.TestResult;
    public type TestError = Type.TestError;

    public func test(canisterId : Principal) : async TestResult {
        let calculatorInterface = actor (Principal.toText(canisterId)) : actor {
            reset : shared () -> async Int;
            add : shared (x : Nat) -> async Int;
            sub : shared (x : Nat) -> async Int
        };

        try {
            let x1 : Int = await calculatorInterface.reset();
            if (x1 != 0) {
                return #err(#UnexpectedValue("After a reset, counter should be 0!"))
            };

            let x2 : Int = await calculatorInterface.add(2);
            if (x2 != 2) {
                return #err(#UnexpectedValue("After 0 + 2, counter should be 2!"))
            };

            let x3 : Int = await calculatorInterface.sub(2);
            if (x3 != 0) {
                return #err(#UnexpectedValue("After 2 - 2, counter should be 0!"))
            };

            return #ok()
        } catch (e) {
            return #err(#UnexpectedError("Something went wrong!"))
        }
    }
}
