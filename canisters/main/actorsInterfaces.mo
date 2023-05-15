import Int "mo:base/Int";
import Float "mo:base/Float";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";

module {

    type Homework = {
        title : Text;
        description : Text;
        dueDate : Time.Time;
        completed : Bool
    };
    type Content = {
        #Text : Text;
        #Image : Blob;
        #Survey : Survey
    };

    type Message = {
        content : Content;
        vote : Int;
        creator : Principal
    };

    type Answer = (
        description : Text, // contains description of the answer
        numberOfVotes : Nat // represents the number of votes for this answer
    );

    type Survey = {
        title : Text; // title describes the survey
        answers : [Answer]; // possible answers for the survey
    };
    type Subaccount = Blob;
    type Account = {
        owner : Principal;
        subaccount : ?Subaccount
    };

    type StudentProfile = {
        name : Text;
        team : Text;
        graduate : Bool
    };
    type TestResult = Result.Result<(), TestError>;
    type TestError = {
        #UnexpectedValue : Text;
        #UnexpectedError : Text
    };

    public type calculatorInt = actor {
        add : shared (x : Float) -> async (Float);
        sub : shared (x : Float) -> async (Float);
        mul : shared (x : Float) -> async (Float);
        div : shared (x : Float) -> async (Float);
        power : shared (x : Float) -> async (Float);
        reset : shared () -> async ();
        see : shared query () -> async (Float);
        sqrt : shared () -> async (Float);
        floor : shared () -> async (Int)
    };

    public type homeworkInt = actor {
        addHomework : shared (homework : Homework) -> async (Nat);
        getHomework : shared query (id : Nat) -> async (Result.Result<Homework, Text>);
        updateHomework : shared (id : Nat, homework : Homework) -> async (Result.Result<(), Text>);
        markAsCompleted : shared (id : Nat) -> async (Result.Result<(), Text>);
        deleteHomework : shared (id : Nat) -> async (Result.Result<(), Text>);
        getAllHomework : shared query () -> async [Homework];
        getPendingHomework : shared query () -> async [Homework];
        searchHomework : shared (searchTerm : Text) -> async [Homework]
    };

    public type wallInt = actor {
        writeMessage : shared (c : Content) -> async (Nat);
        getMessage : shared query (messageId : Nat) -> async (Result.Result<Message, Text>);
        updateMessage : shared (messageId : Nat, c : Content) -> async (Result.Result<(), Text>);
        deleteMessage : shared (messageId : Nat) -> async (Result.Result<(), Text>);
        upVote : shared (messageId : Nat) -> async (Result.Result<(), Text>);
        downVote : shared (messageId : Nat) -> async (Result.Result<(), Text>);
        getAllMessages : shared () -> async [Message];
        getAllMessagesRanked : shared () -> async [Message]
    };
    public type motocoinInt = actor {
        name : shared query () -> async (Text);
        symbol : shared query () -> async (Text);
        totalSupply : shared () -> async (Nat);
        balanceOf : shared query (account : Account) -> async (Nat);
        transfer : shared (
            from : Account,
            to : Account,
            amount : Nat,
        ) -> async (Result.Result<(), Text>);
        airdrop : shared () -> async (Result.Result<(), Text>)
    };

    public type verifierInt = actor {
        isRegistered : shared (p : Principal) -> async (Bool);
        addMyProfile : shared (profile : StudentProfile) -> async (Result.Result<(), Text>);
        seeAProfile : shared query (p : Principal) -> async (Result.Result<StudentProfile, Text>);
        updateMyProfile : shared (profile : StudentProfile) -> async (Result.Result<(), Text>);
        deleteMyProfile : shared () -> async (Result.Result<(), Text>);
        test : shared (canisterId : Principal) -> async (TestResult)
    }
}
