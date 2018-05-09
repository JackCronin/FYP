package jack.fyp;


import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import java.util.Iterator;
import java.util.List;

import cn.pedant.SweetAlert.SweetAlertDialog;

import static cn.pedant.SweetAlert.SweetAlertDialog.SUCCESS_TYPE;

public class EditBuddyList extends AppCompatActivity {
    static final int READ_BLOCK_SIZE = 100;
    public static Context context;
    String line;
    ListView simpleBuddyListView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //edit the list of buddys
        super.onCreate(savedInstanceState);
        context=getApplicationContext();
        setContentView(R.layout.activity_edit_buddy_list);
        FileManager filemanager = new FileManager();
            final List<String> Words = filemanager.ReadfromFile(context);
            simpleBuddyListView = (ListView) findViewById(R.id.simpleBuddyListView);
            final ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,Words);
            simpleBuddyListView.setAdapter(adapter);
            //display options when clicked on item
            simpleBuddyListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, final int position, long id) {
                    switch (position) {
                        case 0:new SweetAlertDialog(EditBuddyList.this)
                                .setTitleText("Buddy Contact")
                                .setContentText("Do you want to delete contact??")
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
                                        String string= "";
                                        Iterator<String> i = Words.iterator();
                                        while (i.hasNext()) {
                                            string = i.next();
                                           if(simpleBuddyListView.getAdapter().getItem(position).toString().matches(string)) {
                                               i.remove();
                                               new SweetAlertDialog(EditBuddyList.this, SUCCESS_TYPE)
                                                       .setTitleText("Success!")
                                                       .setContentText("Contact Deleted!")
                                                       .show();
                                               break;
                                           }
                                        }
//delete buddy from file
                                        FileManager filemanager = new FileManager();
                                        filemanager.DeleteFromFile(Words,context);
                                        adapter.notifyDataSetChanged();
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .show();;
                            break;
                        case 1:new SweetAlertDialog(EditBuddyList.this)
                                .setTitleText("Buddy Contact")
                                .setContentText("Do you want to delete contact??")
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
                                        String string= "";
                                        Iterator<String> i = Words.iterator();
                                        while (i.hasNext()) {
                                            string = i.next();
                                            if(simpleBuddyListView.getAdapter().getItem(position).toString().matches(string)) {
                                                i.remove();
                                                new SweetAlertDialog(EditBuddyList.this, SUCCESS_TYPE)
                                                        .setTitleText("Success!")
                                                        .setContentText("Contact Deleted!")
                                                        .show();
                                                break;
                                            }
                                        }

                                        FileManager filemanager = new FileManager();
                                        filemanager.DeleteFromFile(Words,context);
                                        adapter.notifyDataSetChanged();
                                        sDialog.dismissWithAnimation();
                                    }
                                })
                                .show();;
                            ;
                            break;
                        case 2:new SweetAlertDialog(EditBuddyList.this)
                                .setTitleText("Buddy Contact")
                                .setContentText("Do you want to delete contact??")
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
                                        String string= "";
                                        Iterator<String> i = Words.iterator();
                                        while (i.hasNext()) {
                                            string = i.next();
                                            if(simpleBuddyListView.getAdapter().getItem(position).toString().matches(string)) {
                                                i.remove();
                                                new SweetAlertDialog(EditBuddyList.this, SUCCESS_TYPE)
                                                        .setTitleText("Success!")
                                                        .setContentText("Contact Deleted!")
                                                        .show();
                                                break;
                                            }
                                        }

                                        FileManager filemanager = new FileManager();
                                        filemanager.DeleteFromFile(Words,context);
                                        adapter.notifyDataSetChanged();
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