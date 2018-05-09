package jack.fyp;

import android.content.Context;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import cn.pedant.SweetAlert.SweetAlertDialog;

import static cn.pedant.SweetAlert.SweetAlertDialog.SUCCESS_TYPE;
import static jack.fyp.EditBuddyList.READ_BLOCK_SIZE;

public class FileManager {

    private Context applicationContext;
//write and read from csv file
    public boolean WriteToFile(String content,Context context) {
        String fileName = "BuddyStorageBeta.txt";
        FileOutputStream outputStream = null;
        try {
            outputStream = context.openFileOutput(fileName, Context.MODE_APPEND);
            outputStream.write(content.getBytes());
            outputStream.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public List ReadfromFile(Context context) {
        List<String> Words = null;
        try {
            FileInputStream fileIn = context.openFileInput("BuddyStorageBeta.txt");
            InputStreamReader InputRead = new InputStreamReader(fileIn);

            char[] inputBuffer = new char[READ_BLOCK_SIZE];
            String s = "";
            int charRead;

            while ((charRead = InputRead.read(inputBuffer)) > 0) {
                // char to string conversion
                String readstring = String.copyValueOf(inputBuffer, 0, charRead);
                s += readstring;
            }
            InputRead.close();
            Words = new LinkedList<>((Arrays.asList(s.split(","))));
            return Words;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Words;
    }
    public void DeleteFromFile(List<String> ListOfBuddies, Context context) {
       String content="";
        for(String str : ListOfBuddies){
            content += str + ",";
        }
        String fileName = "BuddyStorageBeta.txt";
        FileOutputStream outputStream = null;
        try {
            outputStream = context.openFileOutput(fileName, Context.MODE_PRIVATE);
            outputStream.write(content.getBytes());
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Context getApplicationContext() {
        return applicationContext;
    }
}
