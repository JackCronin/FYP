package jack.fyp;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PolylineOptions;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    ArrayList<LatLng> listMarkers;
    private LatLng MarkerPos;
    private LatLng UserPos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();
//get intent text from share option menu , example texted address
        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendText(intent);
            }
        }
                // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        listMarkers = new ArrayList<>();

    }
    //use text to replace text in edittext box
    void handleSendText(Intent intent) {
        String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
        EditText searcher = (EditText) findViewById(R.id.STaddress);
        searcher.setText(sharedText);
        if (sharedText != null) {
            // Update UI to reflect text being shared
        }
    }
    private class ReadTask extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... url) {
            String data = "";
            try {
                HttpConnection http = new HttpConnection();
                data = http.readUrl(url[0]);
            } catch (Exception e) {
                Log.d("Background Task", e.toString());
            }
            return data;
        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            new ParserTask().execute(result);
        }
    }


    public void onSearch(View view) {
        EditText location_text = (EditText) findViewById(R.id.STaddress);
        String location = location_text.getText().toString();
        List<Address> addressList = null;
        if (location != null || !location.equals("")) {
//get location of address in search box
            Geocoder geocoder = new Geocoder(this);
            try {
                addressList = geocoder.getFromLocationName(location, 1);
            } catch (IOException e) {
                e.printStackTrace();
            }
            LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return;
            }//current location
            Location currentloc = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            double longitude = currentloc.getLongitude();
            double latitude = currentloc.getLatitude();
            Address address = addressList.get(0);
            MarkerOptions markeroptions = new MarkerOptions();
            //get latlang of current position and destination
            MarkerPos = new LatLng(address.getLatitude(), address.getLongitude());
            UserPos = new LatLng(latitude, longitude);
            mMap.addMarker(new MarkerOptions().position(MarkerPos).title("Destination"));
            mMap.addMarker(new MarkerOptions().position(UserPos).title("User"));
            mMap.animateCamera(CameraUpdateFactory.newLatLng(UserPos));
            Location userposition = new Location("User Location");
            userposition.setLatitude(UserPos.latitude);
            userposition.setLongitude(UserPos.longitude);
            Location Markerposition = new Location("Marker Location");
            Markerposition.setLatitude(MarkerPos.latitude);
            Markerposition.setLongitude(MarkerPos.longitude);

//get the url of directions
            String url = getMapsApiDirectionsUrl();
            ReadTask downloadTask = new ReadTask();
            downloadTask.execute(url);



        }
    }

    private String getMapsApiDirectionsUrl() {
        //waypoints from you to destination
        String waypoints = "waypoints=optimize:true|"
                + UserPos.latitude + "," + UserPos.longitude
                + "|" + "|" +  MarkerPos.latitude + ","
                + MarkerPos.longitude;
        String OriDest = "origin="+UserPos.latitude+","+UserPos.longitude+"&destination="+MarkerPos.latitude+","+MarkerPos.longitude;
        String sensor = "sensor=false";
        String params = OriDest+"&%20"+waypoints + "&" + sensor;
        String output = "json";
        String url = "https://maps.googleapis.com/maps/api/directions/"
                + output + "?" + params;
        return url;
    }
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        mMap.setMyLocationEnabled(true);

    }

    private class ParserTask extends
            AsyncTask<String, Integer, List<List<HashMap<String, String>>>> {

        @Override
        protected List<List<HashMap<String, String>>> doInBackground(
                String... jsonData) {

            JSONObject jObject;
            List<List<HashMap<String, String>>> routes = null;

            try {
                jObject = new JSONObject(jsonData[0]);
                DirectionsJSONParser parser = new DirectionsJSONParser();
                routes = parser.parse(jObject);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return routes;
        }

        @Override
        protected void onPostExecute(List<List<HashMap<String, String>>> routes) {
            ArrayList<LatLng> points = null;
            PolylineOptions polyLineOptions = null;
            String distance = "";
            String duration ="";

            // traversing through routes
            for (int i = 0; i < routes.size(); i++) {
                points = new ArrayList<LatLng>();
                polyLineOptions = new PolylineOptions();
                List<HashMap<String, String>> path = routes.get(i);

                for (int j = 0; j < path.size(); j++) {
                    HashMap<String, String> point = path.get(j);

                    if(j==0){    // Get distance from the list
                        distance = (String)point.get("distance");
                        continue;
                    }else if(j==1){ // Get duration from the list
                        duration = (String)point.get("duration");
                        continue;
                    }

                    double lat = Double.parseDouble(point.get("lat"));
                    double lng = Double.parseDouble(point.get("lng"));
                    LatLng position = new LatLng(lat, lng);

                    points.add(position);
                }

                polyLineOptions.addAll(points);
                polyLineOptions.width(2);
                polyLineOptions.color(Color.BLUE);
            }
            TextView distdisplay = (TextView) findViewById(R.id.distanceDisplay);
            TextView durtdisplay = (TextView) findViewById(R.id.DisplayDuration);
            distdisplay.setText("Distance away " +distance);
            durtdisplay.setText("Duration " +duration );
//add route line
            mMap.addPolyline(polyLineOptions);
        }
    }
}