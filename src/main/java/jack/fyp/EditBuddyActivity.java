package jack.fyp;

import android.content.Intent;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

public class EditBuddyActivity extends AppCompatActivity {

    @Override
    //get new details from form
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_buddy);
        TextView BuddyName = (TextView)findViewById(R.id.BuddyNameTextEdit);
        EditText BuddyNumber = (EditText)findViewById(R.id.BuddyPhoneNumberTextEdit);
        Intent i = getIntent();
        i.getExtras();
        String Details;
        Details = getIntent().getExtras().getString("Textbox","defaultKey");
        String Dets[]=Details.split(" ");
        BuddyName.setText(Dets[0]);
        BuddyNumber.setText(Dets[1]);
    }
}
