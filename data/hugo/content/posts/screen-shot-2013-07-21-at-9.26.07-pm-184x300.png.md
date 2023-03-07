---
title: 'iPhone Programming Tutorial: Creating An Image Gallery Like Over &#8211; Part 1'
date: "2013-08-12T00:00:00.000Z"
type: post 
post_type: article
slug: iphone-programming-tutorial-creating-an-image-gallery-like-over-part-1
tags: 
- iPhone
- iPhone Programming
- alassetslibrary-tutorial
- iOS-programming
- uicollectionview-tutorial
- iPhone App Development
---
[<img class="alignright" alt="Screen Shot 2013-08-09 at 8.36.42 PM" src="/uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png" width="225" height="365" />][1]

&nbsp;

Recently, I have had to build an app (<a href="http://j.mp/scriptapp" target="_blank">download link</a>) that required the user to choose a photo from their photo library.  Rather than just throwing up a **UIImagePickerController** like many apps, I decided to add a little bit of style.  Being inspired by Over&#8217;s ultra simplistic (and beautiful) photo selection interface, I decided to fancy things up a bit.

For this tutorial, I will start with a Fresh **iOS6** View-Based application that uses **Storyboards** and **ARC**. Also note that I will be optimizing for the iPhone 5 resolution.  You are free to make the tweaks necessary to deploy on the iPhone 4 and 4S.

&nbsp;

Here is a breakdown of what we will cover in this part:

  1. <span style="line-height: 14px;">Creating a <strong>UICollectionView </strong>inside of <strong>Storyboard</strong></span>
  2. Using the **ALAssetsLibrary** to fetch photos from the user&#8217;s **Camera Roll**
  3. Displaying the **ALAssets** inside of the **UICollectionView**

### 1. Preparing The IBOutlets

Start by opening up **ViewController.m **and replacing the **@interface** declaration at the top with the following code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #a61390;">@interface</span> ViewController <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>&lt;UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout&gt;
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, weak<span style="color: #002200;">&#41;</span> IBOutlet UICollectionView <span style="color: #002200;">*</span>collectionView;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

This will declare the **IBOutlet **needed to hook up the main **UICollectionView** that we will be using to display the user&#8217;s photos.  I have also set up our class to be a **UICollectionViewDataSource**, **UICollectionViewDelegate**, and **UICollectionViewDelegateFlowLayout**. This is necessary when interfacing with the **UICollectionView.**

### 2. Setting Up The UICollectionView In Storyboard

Open up **MainStoryboard.storyboard **and drag a **UICollectionView** on to your view ensuring that it stretches the entire screen.

[<img class="alignnone size-medium wp-image-210" alt="Screen Shot 2013-07-21 at 8.44.02 PM" src="/uploads/2013/Screen-Shot-2013-07-21-at-8.44.02-PM-172x300.png" width="172" height="300" />][2]

Then, **Control-Click** and drag from the **UICollectionView **to your **ViewController **Object and set it as the **delegate **and **datasource.**

[<img class="alignnone size-full wp-image-209" alt="Screen Shot 2013-07-21 at 8.41.29 PM" src="/uploads/2013/Screen-Shot-2013-07-21-at-8.41.29-PM.png" width="265" height="181" />][3]

Finally, **Control-Click **and drag from **View Controller **to **Collection View** and selected **collectionView **to make the **IBOutlet **connection.

[<img class="alignnone size-full wp-image-211" alt="Screen Shot 2013-07-21 at 8.45.05 PM" src="/uploads/2013/Screen-Shot-2013-07-21-at-8.45.05-PM.png" width="267" height="148" />][4]

Now, we need to give a **Cell Identifier** to the **UICollectionViewCell** so that we can reference it in code.  Click on the default cell inside of the **UICollectionView** and open the **Attributes Inspector. **For the **Identifier** type in **PhotoCell.** The cell might be a little tricky to see as its background color is clear, but it&#8217;s there. Simply click in the top left corner of the **UICollectionView**.

[<img class="alignnone size-medium wp-image-219" alt="Screen Shot 2013-07-21 at 9.13.08 PM" src="/uploads/2013/Screen-Shot-2013-07-21-at-9.13.08-PM-300x67.png" width="300" height="67" />][5]

Now that the **UICollectionView** has been set up, it&#8217;s time to fetch the photos from the user&#8217;s photo library.

<pre style="background-color: #eee; border: 1px solid #444444;">If you are using the simulator, make sure to populate the Photo Gallery with images from the web. Simply open up a browser, do a Google Image Search, and click and hold on various images. You should have an option from the menu that pops up to save the images to your camera roll.

Finally, open up the <b>Photos</b> app on the simulator to initialize the Assets Library.</pre>

### 3. Fetching ALAssets (user photos) From The ALAssets Library

In order to interface with the user&#8217;s photo library, we must first import the **AssetsLibrary.framework **framework.  To do this, click on your project in the sidebar, select the Target, then click **Build Phases, **expand the **Link Binary With Libraries** section and click the **+ **button.  Do a search for **Assset **and then double click on **AssetsLibrary.framework.**

[<img class="alignnone size-medium wp-image-216" alt="Screen Shot 2013-07-21 at 8.57.37 PM" src="/uploads/2013/Screen-Shot-2013-07-21-at-8.57.37-PM-259x300.png" width="259" height="300" />][6]

It should now be added to your project and ready to use.  Now that it has been linked, we must import it into the **ViewController.m **file.  Open up **ViewController.m **and add the following import to the top of the file:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import &lt;AssetsLibrary/AssetsLibrary.h&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

Before we can fetch the user&#8217;s photos, we need to set up an **NSArray** to put them in.  Add the following line within the **@interface **declaration at the top.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, strong<span style="color: #002200;">&#41;</span> <span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>assets;</pre>
      </td>
    </tr>
  </table>
</div>

Now, add the following method to your class:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">+</span> <span style="color: #002200;">&#40;</span>ALAssetsLibrary <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>defaultAssetsLibrary
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">static</span> dispatch_once_t pred <span style="color: #002200;">=</span> <span style="color: #2400d9;"></span>;
    <span style="color: #a61390;">static</span> ALAssetsLibrary <span style="color: #002200;">*</span>library <span style="color: #002200;">=</span> <span style="color: #a61390;">nil</span>;
    dispatch_once<span style="color: #002200;">&#40;</span><span style="color: #002200;">&</span>pred, <span style="color: #002200;">^</span><span style="color: #002200;">&#123;</span>
        library <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>ALAssetsLibrary alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>;
    <span style="color: #002200;">&#125;</span><span style="color: #002200;">&#41;</span>;
    <span style="color: #a61390;">return</span> library;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

This is a static method that creates a static instance to the **ALAssetsLibrary**.  The reason this is needed is, when we enumerate the **ALAssets** in the next method, it seems that the assets get released immediately and otherwise wouldn&#8217;t be able to be used in the rest of the application. I will explain this a little more in a moment.

Head over to **viewDidLoad** and add the following code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>viewDidLoad
<span style="color: #002200;">&#123;</span>
    <span style="color: #002200;">&#91;</span>super viewDidLoad<span style="color: #002200;">&#93;</span>;
&nbsp;
    _assets <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>@<span style="color: #002200;">&#91;</span><span style="color: #002200;">&#93;</span> mutableCopy<span style="color: #002200;">&#93;</span>;
    __block <span style="color: #400080;">NSMutableArray</span> <span style="color: #002200;">*</span>tmpAssets <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>@<span style="color: #002200;">&#91;</span><span style="color: #002200;">&#93;</span> mutableCopy<span style="color: #002200;">&#93;</span>;
    <span style="color: #11740a; font-style: italic;">// 1</span>
    ALAssetsLibrary <span style="color: #002200;">*</span>assetsLibrary <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>ViewController defaultAssetsLibrary<span style="color: #002200;">&#93;</span>;
    <span style="color: #11740a; font-style: italic;">// 2</span>
    <span style="color: #002200;">&#91;</span>assetsLibrary enumerateGroupsWithTypes<span style="color: #002200;">:</span>ALAssetsGroupAll usingBlock<span style="color: #002200;">:^</span><span style="color: #002200;">&#40;</span>ALAssetsGroup <span style="color: #002200;">*</span>group, <span style="color: #a61390;">BOOL</span> <span style="color: #002200;">*</span>stop<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
        <span style="color: #002200;">&#91;</span>group enumerateAssetsUsingBlock<span style="color: #002200;">:^</span><span style="color: #002200;">&#40;</span>ALAsset <span style="color: #002200;">*</span>result, NSUInteger index, <span style="color: #a61390;">BOOL</span> <span style="color: #002200;">*</span>stop<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
            <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>result<span style="color: #002200;">&#41;</span>
            <span style="color: #002200;">&#123;</span>
                <span style="color: #11740a; font-style: italic;">// 3</span>
                <span style="color: #002200;">&#91;</span>tmpAssets addObject<span style="color: #002200;">:</span>result<span style="color: #002200;">&#93;</span>;
            <span style="color: #002200;">&#125;</span>
        <span style="color: #002200;">&#125;</span><span style="color: #002200;">&#93;</span>;
&nbsp;
        <span style="color: #11740a; font-style: italic;">// 4</span>
        <span style="color: #11740a; font-style: italic;">//NSSortDescriptor *sort = [NSSortDescriptor sortDescriptorWithKey:@"date" ascending:NO];</span>
        <span style="color: #11740a; font-style: italic;">//self.assets = [tmpAssets sortedArrayUsingDescriptors:@[sort]];</span>
        self.assets <span style="color: #002200;">=</span> tmpAssets;
&nbsp;
        <span style="color: #11740a; font-style: italic;">// 5</span>
        <span style="color: #002200;">&#91;</span>self.collectionView reloadData<span style="color: #002200;">&#93;</span>;
    <span style="color: #002200;">&#125;</span> failureBlock<span style="color: #002200;">:^</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSError</span> <span style="color: #002200;">*</span>error<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
        NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Error loading images %@"</span>, error<span style="color: #002200;">&#41;</span>;
    <span style="color: #002200;">&#125;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

  1. Grab our static instance of the **ALAssetsLibrary**
  2. Enumerate through all of the **ALAssets **(photos) in the user&#8217;s **Asset Groups** (Folders)
  3. Enumerate each folder and add it&#8217;s **ALAssets **to the temporary array
  4. Sort the assets list by date (this won&#8217;t work yet, but I will show you how to fix later). For now this code is commented out and the Assets will be sorted however they come out.
  5. Reload the **UICollectionView** (this won&#8217;t work yet as we haven&#8217;t set up the delegate methods)

Now that we have an **NSArray** populated with **ALAssets**, let&#8217;s set up the **delegate **methods for the **UICollectionView** in order to populate it with data.

### 4. Populating the UICollectionView With Data

A **UICollectionView** functions much like a **UITableView **having delegate and datasource methods.  Add the following methods to your **ViewController** class to populate the view.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#pragma mark - collection view data source</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>NSInteger<span style="color: #002200;">&#41;</span> collectionView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionView numberOfItemsInSection<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>NSInteger<span style="color: #002200;">&#41;</span>section
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">return</span> self.assets.count;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>UICollectionViewCell <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> collectionView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionView cellForItemAtIndexPath<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSIndexPath</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>indexPath
<span style="color: #002200;">&#123;</span>
    UICollectionViewCell <span style="color: #002200;">*</span>cell <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>UICollectionViewCell <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span>collectionView dequeueReusableCellWithReuseIdentifier<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"PhotoCell"</span> forIndexPath<span style="color: #002200;">:</span>indexPath<span style="color: #002200;">&#93;</span>;
&nbsp;
    ALAsset <span style="color: #002200;">*</span>asset <span style="color: #002200;">=</span> self.assets<span style="color: #002200;">&#91;</span>indexPath.row<span style="color: #002200;">&#93;</span>;
    <span style="color: #11740a; font-style: italic;">//cell.asset = asset;</span>
    cell.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor redColor<span style="color: #002200;">&#93;</span>;
&nbsp;
    <span style="color: #a61390;">return</span> cell;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>CGFloat<span style="color: #002200;">&#41;</span> collectionView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionView layout<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionViewLayout <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionViewLayout minimumLineSpacingForSectionAtIndex<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>NSInteger<span style="color: #002200;">&#41;</span>section
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">return</span> <span style="color: #2400d9;">4</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>CGFloat<span style="color: #002200;">&#41;</span> collectionView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionView layout<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UICollectionViewLayout <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>collectionViewLayout minimumInteritemSpacingForSectionAtIndex<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>NSInteger<span style="color: #002200;">&#41;</span>section
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">return</span> <span style="color: #2400d9;">1</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

This code should be fairly straight forward if you have ever worked with a **UITableView.**  The only lines to note are where &#8216;cell.asset = asset&#8217; is commented out and we set the cell&#8217;s background color to red.  We will uncomment that line when we create a custom cell to display the image (for now it won&#8217;t).  I have also set the background color to red so that you can see that the number of cells is actually corresponding to the number of photos in the camera roll.

**Build and Run!**

Let&#8217;s take a break to do a build and run to see what happens.  If you have hooked everything up correctly, you should see a black screen with red squares on it with a count equalling the number of photos in the user&#8217;s library.

[<img class="alignnone size-medium wp-image-225" alt="Screen Shot 2013-07-21 at 9.26.07 PM" src="/uploads/2013/Screen-Shot-2013-07-21-at-9.26.07-PM-184x300.png" width="184" height="300" />][7]

Not too exciting, however it shows that we are displaying a number of cells corresponding to the number of photos in the user&#8217;s asset library.  At least it&#8217;s showing that you have done something.  The next step is to create a custom **UICollectionViewCell** that actually displays the photos, which we will do next time.

### 5. Next Time

That&#8217;s all for today.  In a ploy to get you to come back to my site (and[ subscribe to my RSS feed][8]), I have chosen to break this post up into two parts.  

Luckily for you, I wrote the above message a while ago. Click the link below to go to part 2!

[iPhone Programming Tutorial: Creating An Image Gallery Like Over – Part 2][9]

Stay tuned!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="iPhone Programming Tutorial: Creating An Image Gallery Like Over - Part 1" data-url="http://brandontreb.com/iphone-programming-tutorial-creating-an-image-gallery-like-over-part-1"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: /uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png
 [2]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-8.44.02-PM.png
 [3]: /uploads/2013/Screen-Shot-2013-07-21-at-8.41.29-PM.png
 [4]: /uploads/2013/Screen-Shot-2013-07-21-at-8.45.05-PM.png
 [5]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-9.13.08-PM.png
 [6]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-8.57.37-PM.png
 [7]: http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-9.26.07-PM.png
 [8]: http://feeds.feedburner.com/brandontreb
 [9]: http://brandontreb.com/iphone-programming-tutorial-creating-an-image-gallery-like-over-part-2
