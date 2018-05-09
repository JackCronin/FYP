package jack.fyp;


import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.Toast;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.orhanobut.dialogplus.DialogPlus;
import com.orhanobut.dialogplus.DialogPlusBuilder;
import com.orhanobut.dialogplus.OnItemClickListener;

import java.util.ArrayList;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button MapsBtn = (Button) findViewById(R.id.button2);
        Button RecieveddMsgBtn = (Button) findViewById(R.id.button3);
        Button ArrivedMsgBtn = (Button) findViewById(R.id.button4);
        Button EmergencyBtn = (Button) findViewById(R.id.button5);
        Button RotaBtn = (Button) findViewById(R.id.button);
        Button LogOutButton = (Button) findViewById(R.id.button6);
        ImageButton BuddySettings = (ImageButton) findViewById(R.id.imageButton);
        assert MapsBtn != null;
        //go to google maps function
        MapsBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, MapsActivity.class));
            }
        });
        //check rota button
        RotaBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                startActivity(new Intent(MainActivity.this, RotaActivity.class));
            }
        });
        //logout user from firebase and send to login page
        LogOutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               FirebaseAuth.getInstance().signOut();
                startActivity(new Intent(MainActivity.this, LoginActivity.class));
            }
        });
        //Send a recieved text
        RecieveddMsgBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new SweetAlertDialog(MainActivity.this)
                        .setTitleText("Send Message")
                        .setContentText("Are you sure you want to send Recieved message?")
                        .setCancelText("Cancel")
                        .setConfirmText("Send")
                        .showCancelButton(true)
                        .setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                sDialog.cancel();
                            }
                        })
                        .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("sms:" + "0877437957"));
                                intent.putExtra("sms_body", "Message");
                                startActivity(intent);
                                sDialog.dismissWithAnimation();
                            }
                        })
                        .show();
            }
        });
        //Send an arrived text
        ArrivedMsgBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new SweetAlertDialog(MainActivity.this)
                        .setTitleText("Send Message")
                        .setContentText("Are you sure you want to send Arrived message?")
                        .setCancelText("Cancel")
                        .setConfirmText("Send")
                        .setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                sDialog.cancel();
                            }
                        })
                        .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("sms:" + "0877437957"));
                                intent.putExtra("sms_body", "Message");
                                startActivity(intent);
                                sDialog.dismissWithAnimation();
                            }
                        })
                        .show();
            }
        });
//call emenency number
        EmergencyBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new SweetAlertDialog(MainActivity.this)
                        .setTitleText("Emergency Contact")
                        .setContentText("Do you want to ring 999?")
                        .setCancelText("Cancel")
                        .setConfirmText("Call")
                        .showCancelButton(true)
                        .setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                sDialog.cancel();
                            }
                        })
                        .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                            @Override
                            public void onClick(SweetAlertDialog sDialog) {
                                Intent intent = new Intent(Intent.ACTION_CALL);
                                intent.setData(Uri.parse("tel:0877437957"));
                                if (ActivityCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                                    // TODO: Consider calling
                                    //    ActivityCompat#requestPermissions
                                    // here to request the missing permissions, and then overriding
                                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                    //                                          int[] grantResults)
                                    // to handle the case where the user grants the permission. See the documentation
                                    // for ActivityCompat#requestPermissions for more details.
                                    return;
                                }
                                startActivity(intent);
                            }
                        })
                        .show();
            }
        });
        //show list of buddy settings
        BuddySettings.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ListView simpleList;
                ArrayList<Item> itemList=new ArrayList<>();
                simpleList = (ListView) findViewById(R.id.simpleListView);
                itemList.add(new Item("Add New Buddy",R.drawable.addbuddy));
                itemList.add(new Item("Edit Buddy List",R.drawable.editbuddy));
                itemList.add(new Item("Edit Buddy Details",R.drawable.editdetailsbuddy));

                MyAdapter myAdapter=new MyAdapter(MainActivity.this,R.layout.list_view_items,itemList);
                DialogPlus dialog = DialogPlus.newDialog(MainActivity.this)
                        .setAdapter(myAdapter)
                        .setOnItemClickListener(new OnItemClickListener() {
                            @Override
                            public void onItemClick(DialogPlus dialog, Object item, View view, int position) {
                                switch(position){
                                    case 0:startActivity(new Intent(MainActivity.this, AddBuddyActivity.class));break;
                                    case 1:startActivity(new Intent(MainActivity.this, EditBuddyList.class));break;
                                    case 2:startActivity(new Intent(MainActivity.this, EditBuddyDetails.class));break;

                                }
                            }
                        })

                        .setContentBackgroundResource(R.color.backgroundgrey)
                        .setInAnimation(R.anim.abc_fade_in)
                        .setOutAnimation(R.anim.abc_fade_out)
                        .setExpanded(true)  // This will enable the expand feature, (similar to android L share dialog)
                        .create();
                dialog.show();
            }
        });
    }
}

