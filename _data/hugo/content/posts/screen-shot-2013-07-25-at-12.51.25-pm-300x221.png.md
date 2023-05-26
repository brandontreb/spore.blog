---
title: 'iPhone Programming Tutorial: Creating An Image Gallery Like Over &#8211; Part 2'
date: "2013-08-15T00:00:00.000Z"
type: post 
post_type: article
slug: iphone-programming-tutorial-creating-an-image-gallery-like-over-part-2
tags: 
- iPhone Programming
- alassetslibrary-tutorial
- iOS-programming
- uicollectionview-tutorial
- iPhone App Development
---
[<img class="alignright" alt="Screen Shot 2013-08-09 at 8.36.42 PM" src="/uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png" width="225" height="365" />][1]

&nbsp;

Welcome to the second part of my tutorial series &#8220;**Creating An Image Gallery Like Over&#8221;.**  In this part of the tutorial, you will learn how to actually display the photos in the UICollectionView as well as give the user the ability to take photos with their camera.

If you haven&#8217;t already done so, please go back and[ complete part 1][2].

### 1. Custom UICollectionViewCell

Start by creating a new subclass of **UICollectionViewCell** and naming it **PhotoCell.  **Now, open up PhotoCell.h and add the following code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import &lt;AssetsLibrary/AssetsLibrary.h&gt;</span>
&nbsp;
<span style="color: #a61390;">@interface</span> PhotoCell <span style="color: #002200;">:</span> UICollectionViewCell
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, strong<span style="color: #002200;">&#41;</span> ALAsset <span style="color: #002200;">*</span>asset;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

Now, open PhotoCell.m and add the following code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "PhotoCell.h"</span>
&nbsp;
<span style="color: #a61390;">@interface</span> PhotoCell <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>
<span style="color: #11740a; font-style: italic;">// 1</span>
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, weak<span style="color: #002200;">&#41;</span> IBOutlet UIImageView <span style="color: #002200;">*</span>photoImageView;
<span style="color: #a61390;">@end</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> PhotoCell
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> setAsset<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>ALAsset <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>asset
<span style="color: #002200;">&#123;</span>
    <span style="color: #11740a; font-style: italic;">// 2</span>
    _asset <span style="color: #002200;">=</span> asset;
    self.photoImageView.image <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIImage imageWithCGImage<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span>asset thumbnail<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

  1. This is an **IBOutlet **to a **UIImageView** that we will create inside of the Storyboard
  2. We overwrite the setter method for the asset in order to convert the asset&#8217;s thumbnail into a UIImage and set it to the contents of the UIImageView

Now that we have the custom cell created, we need to hook it up and create the UIImageView inside of Storyboard.  Open **MainStoryboard.storyboard **and click on the default **UICollectionViewCell** inside of your **UICollectionView.**

It might be tricky to see the cell as it has a white background and blends in, but it&#8217;s there.

[<img alt="Screen Shot 2013-07-24 at 6.43.38 PM" src="/uploads/2013/Screen-Shot-2013-07-24-at-6.43.38-PM-300x281.png" width="300" height="281" />][3]

Now, click on the **Identity Inspector** from the right side bar and change the class to **PhotoCell.**  This will inform interface builder that this object is of the type PhotoCell and let us hook up the photoImageView outlet.

[<img alt="Screen Shot 2013-07-24 at 6.46.35 PM" src="/uploads/2013/Screen-Shot-2013-07-24-at-6.46.35-PM.png" width="260" height="70" />][4]

Next, open the size inspector, change the size to **Custom, **the width to **104 **and the height to **104.**  This will give us nice sized images, with a good amount of padding between them.

[<img alt="Screen Shot 2013-07-24 at 6.49.51 PM" src="/uploads/2013/Screen-Shot-2013-07-24-at-6.49.51-PM.png" width="260" height="105" />][5]

The **UICollectionView** will overwrite these sizes, so we need to change it in one other location.  To ensure that the cells stay the correct size, click on the **Collection View** in left side bar and open it&#8217;s **Size Inspector**.  Then set the **Cell Size** width and height to 104.

[<img alt="Screen Shot 2013-07-24 at 7.07.14 PM" src="/uploads/2013/Screen-Shot-2013-07-24-at-7.07.14-PM.png" width="260" height="81" />][6]

The final step here is to drag a **UIImageView** on to your cell (scaling it to fit the entire cell size), and hook up the **IBOutlet** to the photoImageView. Do this by control-click and dragging from Photo Cell to the ImageView and selecting **photoImageView**.

[<img alt="Screen Shot 2013-07-24 at 6.52.32 PM" src="/uploads/2013/Screen-Shot-2013-07-24-at-6.52.32-PM-300x147.png" width="300" height="147" />][7]

If you build and run at this stage, nothing will be different.  That&#8217;s because we still need to tell the ViewController class about our new **PhotoCell**.  Open **ViewController.m **and import **PhotoCell.h**.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "PhotoCell.h"</span></pre>
      </td>
    </tr>
  </table>
</div>

Now, head down to the **collectionView:cellForItemAtIndexPath** method and replace the contents of it with the following code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>UICollectionViewCell <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> collectionView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionView cellForItemAtIndexPath<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSIndexPath</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>indexPath
<span style="color: #002200;">&#123;</span>
    PhotoCell <span style="color: #002200;">*</span>cell <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>PhotoCell <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span>collectionView dequeueReusableCellWithReuseIdentifier<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"PhotoCell"</span> forIndexPath<span style="color: #002200;">:</span>indexPath<span style="color: #002200;">&#93;</span>;
&nbsp;
    ALAsset <span style="color: #002200;">*</span>asset <span style="color: #002200;">=</span> self.assets<span style="color: #002200;">&#91;</span>indexPath.row<span style="color: #002200;">&#93;</span>;
    cell.asset <span style="color: #002200;">=</span> asset;
    cell.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor redColor<span style="color: #002200;">&#93;</span>;
&nbsp;
    <span style="color: #a61390;">return</span> cell;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

What&#8217;s changed here is, we are now telling the **UICollectionView** that the cell it&#8217;s returning is of the type **PhotoCell**. Also, we are fetching the **ALAsset** out of our array at each index and sending it to the cell so that it can display it&#8217;s thumbnail.

**Build And Run!**

[<img alt="Screen Shot 2013-07-24 at 7.10.39 PM" src="/uploads/2013/Screen-Shot-2013-07-24-at-7.10.39-PM-184x300.png" width="184" height="300" />][8]

Whoohoo**! **You should now see your photos populating the **UICollectionView. Congratulations! </p> 

</strong>While, this is definitely cool, you might now be wondering &#8220;how do I select a photo?&#8221;.  Great question, and here is the solution.

### 2. Selecting Photos

Now that you have all of the groundwork in place, selecting photos from the collection could not be easier.  Open up **ViewController.m** and replace the **collectionView:didSelectItemAtIndexPath **method with the following code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> collectionView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionView didSelectItemAtIndexPath<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSIndexPath</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>indexPath
<span style="color: #002200;">&#123;</span>
    ALAsset <span style="color: #002200;">*</span>asset <span style="color: #002200;">=</span> self.assets<span style="color: #002200;">&#91;</span>indexPath.row<span style="color: #002200;">&#93;</span>;
    ALAssetRepresentation <span style="color: #002200;">*</span>defaultRep <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>asset defaultRepresentation<span style="color: #002200;">&#93;</span>;
    UIImage <span style="color: #002200;">*</span>image <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIImage imageWithCGImage<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span>defaultRep fullScreenImage<span style="color: #002200;">&#93;</span> scale<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span>defaultRep scale<span style="color: #002200;">&#93;</span> orientation<span style="color: #002200;">:</span><span style="color: #2400d9;"></span><span style="color: #002200;">&#93;</span>;
    <span style="color: #11740a; font-style: italic;">// Do something with the image</span>
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

This will get the selected asset and convert it to a UIImage. You are now free to use the UIImage how you want. Perhaps you create a protocol for this class and make a callback to a delegate OR maybe you add this to a UINavigationController stack and push a new view controller on to the stack containing this image. The sky is the limit!

If you look at the Over app and back to your image gallery that you just created, you will notice something is still missing.  What if the user wants to take a photo or access other albums?  This is where Over adds a bar across the top of the interface with 2 buttons that fall back to the &#8220;default&#8221; style of fetching images if the user wants to take a photo or access a different photo album.  Let&#8217;s build this out now.

### 3. Building The Interface To Take Photos And Access Albums

Start by setting up the **IBActions** for theses buttons.  Open **ViewController.m** and add the following empty methods:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#pragma mark - Actions</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>takePhotoButtonTapped<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender
<span style="color: #002200;">&#123;</span>
&nbsp;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>albumsButtonTapped<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender
<span style="color: #002200;">&#123;</span>
&nbsp;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

We don&#8217;t need to add the code yet since we still need to build the UI and hook up the **IBOutlets**. Now open **MainStoryboard.storyboard **and drag a **UIView **right on top of your **UIView.**

One issue you might run in to here is the view will want to become a subview of the collection view.  To combat this, drag the view outside of the collection view inside the left bar so the hierarchy will look like this:

[<img alt="Screen Shot 2013-07-25 at 12.35.06 PM" src="/uploads/2013/Screen-Shot-2013-07-25-at-12.35.06-PM.png" width="265" height="162" />][9]

&nbsp;

One other &#8220;gotcha&#8221; is, you must ensure that the view is positioned **below** the collection view in this list, otherwise it won&#8217;t show above it on screen.

Now, let&#8217;s manually size and position the view as Interface Building will make things hard on us if we want to position it over our collection view.

Select the view and open the **Size Inspector.** Set the values as follows:

[<img alt="Screen Shot 2013-07-25 at 12.44.23 PM" src="/uploads/2013/Screen-Shot-2013-07-25-at-12.44.23-PM.png" width="260" height="168" />][10]

&nbsp;

Again, remember this positioning is optimized for the iPhone 5. So make sure you are testing with that simulator or you won&#8217;t see this bar.

After this, the bar still won&#8217;t be visible inside of Interface Builder.  We need to set the background color to black with some transparency.  Open the **Attributes Inspector** and click on the background color.  Then set the color to black with 80% opacity:

[<img alt="Screen Shot 2013-07-25 at 12.40.13 PM" src="/uploads/2013/Screen-Shot-2013-07-25-at-12.40.13-PM-177x300.png" width="177" height="300" />][11]

&nbsp;

You should now see the bar positioned on the screen like this:

[<img alt="Screen Shot 2013-07-25 at 12.41.54 PM" src="/uploads/2013/Screen-Shot-2013-07-25-at-12.41.54-PM-154x300.png" width="154" height="300" />][12]

&nbsp;

Now drag a **UIButton **on to the view you just created. There are a few things that must be done to style the button:

  1. Position it at 0,0
  2. Set the width to 160px and the height to 70x
  3. Change the type to custom
  4. Change the text to &#8220;Take Photo&#8221;
  5. Change the font to &#8220;Helvetica Neue Condensed Black&#8221; size 20
  6. Set the text color to white

When you have completed these steps, the button should look like this:

[<img alt="Screen Shot 2013-07-25 at 12.47.26 PM" src="/uploads/2013/Screen-Shot-2013-07-25-at-12.47.26-PM-300x213.png" width="300" height="213" />][13]

&nbsp;

Now, hook up the **IBAction **by opening the **Connections Inspector** and dragging from **Touch Up Inside** to the **View Controller** object and selecting t**akePhotoButtonTapped:**

Finally, duplicate this button (copy and paste), rename the title to &#8220;Albums&#8221;, move it next to the &#8220;Take Photo&#8221; button and hook its **Touch Up Inside** to **albumsButtonTapped:**

The final Interface should look like this:

[<img alt="Screen Shot 2013-07-25 at 12.51.25 PM" src="/uploads/2013/Screen-Shot-2013-07-25-at-12.51.25-PM-300x221.png" width="300" height="221" />][14]

&nbsp;

Go ahead and do a **Build and Run** and this stage and marvel at your interface development prowess!

### 4. Actually Taking Photos And Accessing Albums

The final step for this tutorial is to implement the code to bring up the camera as well as bring up the photo albums.  Let&#8217;s start with the camera.  Open **ViewController.m** and add the following code to the **takePhotosButtonTapped:** method:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>takePhotoButtonTapped<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#40;</span><span style="color: #002200;">&#91;</span>UIImagePickerController isSourceTypeAvailable<span style="color: #002200;">:</span>
          UIImagePickerControllerSourceTypeCamera<span style="color: #002200;">&#93;</span> <span style="color: #002200;">==</span> <span style="color: #a61390;">NO</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#41;</span>
        <span style="color: #a61390;">return</span>; <span style="color: #11740a; font-style: italic;">// 1</span>
&nbsp;
    <span style="color: #11740a; font-style: italic;">// 2</span>
    UIImagePickerController <span style="color: #002200;">*</span>mediaUI <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UIImagePickerController alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>;
    mediaUI.sourceType <span style="color: #002200;">=</span> UIImagePickerControllerSourceTypeCamera;
    mediaUI.allowsEditing <span style="color: #002200;">=</span> <span style="color: #a61390;">NO</span>;
    mediaUI.delegate <span style="color: #002200;">=</span> self;
    <span style="color: #11740a; font-style: italic;">// 3</span>
    <span style="color: #002200;">&#91;</span>self presentViewController<span style="color: #002200;">:</span>mediaUI animated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span> completion<span style="color: #002200;">:</span><span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

  1. Makes sure that the photo library is available.  If the user declines photo access, this will be the case.
  2. Create the **UIImagePickerController** and set its source type to **UIImagePickerControllerSourceTypeCamera**.  This lets the media picker know to use the camera and not the image library.
  3. Finally, present the view controller modally

The method to bring up the photo albums is almost identical to the method above.  Add the following code to the **albumsButtonTapped:** method.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>albumsButtonTapped<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#40;</span><span style="color: #002200;">&#91;</span>UIImagePickerController isSourceTypeAvailable<span style="color: #002200;">:</span>
          UIImagePickerControllerSourceTypePhotoLibrary<span style="color: #002200;">&#93;</span> <span style="color: #002200;">==</span> <span style="color: #a61390;">NO</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#41;</span>
        <span style="color: #a61390;">return</span>;
&nbsp;
    UIImagePickerController <span style="color: #002200;">*</span>mediaUI <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UIImagePickerController alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>;
    mediaUI.sourceType <span style="color: #002200;">=</span> UIImagePickerControllerSourceTypePhotoLibrary;    
    mediaUI.allowsEditing <span style="color: #002200;">=</span> <span style="color: #a61390;">NO</span>;
    mediaUI.delegate <span style="color: #002200;">=</span> self;
    <span style="color: #002200;">&#91;</span>self presentViewController<span style="color: #002200;">:</span>mediaUI animated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span> completion<span style="color: #002200;">:</span><span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

As I said before, this method is almost identical with the only difference being, we are using **UIImagePickerControllerSourceTypePhotoLibrary **to open up the photo albums.

**Build and Run** and tap the &#8220;Take Photo&#8221; button. Make sure you are testing on the device at this stage or nothing will happen since the simulator doesn&#8217;t have a camera.  You can however test the &#8220;Albums&#8221; button assuming you have some photos in your photo library.

Now that you are able to pick a photo, you need to be able to access the photo that was selected or taken.  To do this implement the following delegate method for **UIImagePickerController.**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#pragma mark - image picker delegate</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> imagePickerController<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UIImagePickerController <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>picker didFinishPickingMediaWithInfo<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSDictionary</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>info
<span style="color: #002200;">&#123;</span>
    UIImage <span style="color: #002200;">*</span>image <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>UIImage <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#91;</span>info objectForKey<span style="color: #002200;">:</span>
                                          UIImagePickerControllerOriginalImage<span style="color: #002200;">&#93;</span>;    
    <span style="color: #002200;">&#91;</span>self dismissViewControllerAnimated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span> completion<span style="color: #002200;">:^</span><span style="color: #002200;">&#123;</span>
        <span style="color: #11740a; font-style: italic;">// Do something with the image</span>
    <span style="color: #002200;">&#125;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

This method fetches the selected (or taken) image and stores. It then dismisses the camera or photo albums allowing you to do whatever is needed with the image.

### 5. Next Steps

By now, you should have learned how to use the **ALAssets **library to interact with a user&#8217;s photos and use them to build a custom interface. You also learned how to use a **UICollectionView** to display a grid of photos.

With this knowledge in hand, you should now be able to make much more interesting photo selection interfaces than the default one Apple has to offer.  Other apps like Google+ and Instagram both have very slick photo pickers and I hope this tutorial has your gears going thinking about other interesting photo selection interfaces.

You can download the source from this tutorial on [GitHub][15]

Feel free to leave a comment if you have any questions. Happy Hacking!

&nbsp;

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="iPhone Programming Tutorial: Creating An Image Gallery Like Over - Part 2" data-url="http://brandontreb.com/iphone-programming-tutorial-creating-an-image-gallery-like-over-part-2"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: /uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png
 [2]: http://brandontreb.com/iphone-programming-tutorial-creating-an-image-gallery-like-over-part-1
 [3]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-24-at-6.43.38-PM.png
 [4]: /uploads/2013/Screen-Shot-2013-07-24-at-6.46.35-PM.png
 [5]: /uploads/2013/Screen-Shot-2013-07-24-at-6.49.51-PM.png
 [6]: /uploads/2013/Screen-Shot-2013-07-24-at-7.07.14-PM.png
 [7]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-24-at-6.52.32-PM.png
 [8]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-24-at-7.10.39-PM.png
 [9]: /uploads/2013/Screen-Shot-2013-07-25-at-12.35.06-PM.png
 [10]: /uploads/2013/Screen-Shot-2013-07-25-at-12.44.23-PM.png
 [11]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.40.13-PM.png
 [12]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.41.54-PM.png
 [13]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.47.26-PM.png
 [14]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.51.25-PM.png
 [15]: https://github.com/brandontreb/OverPicker
