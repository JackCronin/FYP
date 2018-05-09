package jack.fyp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Map;

public class AddBuddyActivity  extends AppCompatActivity {
    private ArrayList<User> arrayOfNames = new ArrayList<>();
    private ArrayAdapter<User> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_buddy);
        Spinner dropdown = findViewById(R.id.spinner);
//create a list of items for the spinner.
//create an adapter to describe how the items are displayed, adapters are used in several places in android.
//There are multiple variations of this, but this is the basic variant.
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, arrayOfNames);
//set the spinners adapter to the previously created one.
        dropdown.setAdapter(adapter);
        //get current user
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        String uid;
        if (user != null) {
            uid = user.getUid();
            final FirebaseDatabase database = FirebaseDatabase.getInstance();
//search user node in firebase console on current user id
            DatabaseReference myRef = database.getReference("Users").child(uid);
            myRef.child("Group").addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    String GroupKey = dataSnapshot.getValue(String.class);
                    System.out.println("Group Key");
                    System.out.println(GroupKey);
                    getGroupIDFromDB(GroupKey);
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                }
            });
        } else {
            uid = "None Found";
        }
    }
//get members from group database based on group id from user node
    public void getGroupIDFromDB(String GroupKey) {
        final FirebaseDatabase database = FirebaseDatabase.getInstance();

        DatabaseReference myRef = database.getReference("Groups").child(GroupKey);
        myRef.child("Members").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Map<String, Object> Members = (Map<String, Object>) dataSnapshot.getValue();
                System.out.println("Members");
                System.out.println(Members);
                getNameFromKey(Members);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });

    }
    //use user node with key from group node to get names of user
    public void getNameFromKey(Map<String, Object> Members) {
        String userKey= "";
        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        for (Map.Entry<String, Object> entry : Members.entrySet()) {
            userKey = (entry.getKey());
            System.out.println(userKey);
            DatabaseReference myRef = database.getReference("Users").child(userKey);
            final String finalUserKey = userKey;
            myRef.child("name").addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    String UserName = dataSnapshot.getValue(String.class);
                    if(UserName != null){
                        System.out.println(finalUserKey +UserName);
                        arrayOfNames.add(new User(finalUserKey,UserName));
                        System.out.println(arrayOfNames);
                        adapter.notifyDataSetChanged();
                    }

                }

                @Override
                public void onCancelled(DatabaseError databaseError) {

                }
            });
        }


    }


}