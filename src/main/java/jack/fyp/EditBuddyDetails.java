package jack.fyp;


import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.List;

import cn.pedant.SweetAlert.SweetAlertDialog;

import static cn.pedant.SweetAlert.SweetAlertDialog.SUCCESS_TYPE;

public class EditBuddyDetails extends AppCompatActivity {
    static final int READ_BLOCK_SIZE = 100;
    String line;
    ListView simpleBuddyListView;
    public static Context context;
    @Override
    //create editbuddydetails form
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context=getApplicationContext();
        setContentView(R.layout.activity_edit_buddy_list);
        FileManager filemanager = new FileManager();
        List<String> Words = filemanager.ReadfromFile(context);
            simpleBuddyListView = (ListView) findViewById(R.id.simpleBuddyListView);
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,Words);
            simpleBuddyListView.setAdapter(adapter);
            //display otions when clicked on item
            simpleBuddyListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, final int position, long id) {
                    switch (position) {
                        case 0:new SweetAlertDialog(EditBuddyDetails.this)
                                .setTitleText("Buddy Contact")
                                .setContentText("Do you want to edit contact??")
                                .setCancelText("No")
                                .setConfirmText("Yes")
                                .showCancelButton(true)
                                .setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                                    @Override
                                    public void onClick(SweetAlertDialog sDialog) {
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                                    @Override
                                    public void onClick(SweetAlertDialog sDialog) {
                                        Intent intent = new Intent(EditBuddyDetails.this, EditBuddyActivity.class);
                                        String Details = "";
                                        Details =simpleBuddyListView.getAdapter().getItem(position).toString();
                                        intent.putExtra("Textbox",Details);
                                        startActivity(intent);
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .show();;
                            break;
                        case 1:new SweetAlertDialog(EditBuddyDetails.this)
                                .setTitleText("Buddy Contact")
                                .setContentText("Do you want to edit contact??")
                                .setCancelText("No")
                                .setConfirmText("Yes")
                                .showCancelButton(true)
                                .setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                                    @Override
                                    public void onClick(SweetAlertDialog sDialog) {
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                                    @Override
                                    public void onClick(SweetAlertDialog sDialog) {
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .show();;
                            ;
                            break;
                        case 2:new SweetAlertDialog(EditBuddyDetails.this)
                                .setTitleText("Buddy Contact")
                                .setContentText("Do you want to edit contact??")
                                .setCancelText("No")
                                .setConfirmText("Yes")
                                .showCancelButton(true)
                                .setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                                    @Override
                                    public void onClick(SweetAlertDialog sDialog) {
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                                    @Override
                                    public void onClick(SweetAlertDialog sDialog) {
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .show();;
                            ;
                            break;
                    }

                }
            });
    }
}
