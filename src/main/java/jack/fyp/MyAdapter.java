package jack.fyp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;


public class MyAdapter extends ArrayAdapter<Item> {

    ArrayList<Item> itemList = new ArrayList<>();

    public MyAdapter(Context context, int textViewResourceId, ArrayList<Item> objects) {
        super(context, textViewResourceId, objects);
        itemList = objects;
    }

    @Override
    public int getCount() {
        return super.getCount();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
//used from displaying add buddy items in item list
        View v = convertView;
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        v = inflater.inflate(R.layout.list_view_items, null);
        TextView textView = (TextView) v.findViewById(R.id.textView);
        ImageView imageView = (ImageView) v.findViewById(R.id.imageView);
        textView.setText(itemList.get(position).getItemName());
        imageView.setImageResource(itemList.get(position).getItemImage());
        return v;

    }

}