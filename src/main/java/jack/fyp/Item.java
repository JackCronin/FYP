package jack.fyp;

public class Item {
//item class for display items in iotem list
    String ItemName;
    int ItemImage;

    public Item(String ItemName,int ItemImage)
    {
        this.ItemImage=ItemImage;
        this.ItemName=ItemName;
    }
    public String getItemName()
    {
        return ItemName;
    }
    public int getItemImage()
    {
        return ItemImage;
    }
}