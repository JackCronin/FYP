package jack.fyp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SundayActivity extends AppCompatActivity {
    private ArrayList<String> arrayOfNames = new ArrayList<>();
    private ArrayAdapter<String> adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sunday_activity);
        ListView simpleList;
        simpleList = (ListView) findViewById(R.id.simpleSchedListViewTues);
        adapter = new ArrayAdapter<String>(SundayActivity.this, android.R.layout.simple_list_item_1, arrayOfNames);
        simpleList.setAdapter(adapter);

        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        String uid;
        if (user != null) {
            uid = user.getUid();

            final FirebaseDatabase database = FirebaseDatabase.getInstance();

            DatabaseReference myRef = database.getReference("Users").child(uid);
            myRef.child("Group").addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    String GroupKey = dataSnapshot.getValue(String.class);
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
//get sundays schedule
    public void getSchedule(String SchedKey) {
        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference("Schedules");
        myRef.child(SchedKey).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ListView simpleScheduleListView;
                String userKey = "";
                Map<String, Object> map = (Map<String, Object>) dataSnapshot.getValue();
                getNameFromKey(map , "Sunday");
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });
    }
//get the current schedule key
    public void getGroupIDFromDB(String GroupKey) {
        final FirebaseDatabase database = FirebaseDatabase.getInstance();

        DatabaseReference myRef = database.getReference("Groups").child(GroupKey);
        myRef.child("currentSchedule").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                String ShedKey = dataSnapshot.getValue(String.class);
                getSchedule(ShedKey);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });

    }
//get the names from that schedule
    public void getNameFromKey(Map<String, Object> Days ,String Day) {
        String userKey= "";

        final ArrayList<String> nameList=new ArrayList<>();
        Map<String, Object> DayofWeek = (Map<String, Object>) Days.get(Day);
        final FirebaseDatabase database = FirebaseDatabase.getInstance();

        for (Map.Entry<String, Object> entry : DayofWeek.entrySet()) {
            userKey = (entry.getValue().toString());
            DatabaseReference myRef = database.getReference("Users").child(userKey);
            myRef.child("name").addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    String UserName = dataSnapshot.getValue(String.class);
                    if(UserName != null){
                        arrayOfNames.add(UserName);
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