jQuery-slowlane by Help.com
===========================

![Help.com Logo](http://help.com/skin/images/nav-logo-dark.svg)

On Wednesday, September 10th, several high-profile sites such as [Kickstarter](http://kickstarter.com), [Etsy](http://etsy.com), [Reddit](http://reddit.com), [Mozilla](http://mozilla.com), and [Meetup](http://meetup.com) are participating in a ["slow-lane" protest](http://www.cnet.com/au/news/top-websites-join-internet-slowdown-day-in-symbolic-protest-of-fast-lanes/) in a show of solidarity to preserve Net Neutrality.

All of the slow downs will be artificially produced on the front-end. We decided to help out the community by creating a jQuery plugin to create this fake slow-lane effect for you. If you believe in preserving Net Neutrality, feel free to use this plugin to join the cause and spread awareness.

## Example
We've got an [example page setup](http://help.com/jquery-slowlane) for you to preview the plugin.

Additionally, the repo has an example node server you can spin up and test it out yourself.
```
git clone https://github.com/helpdotcom/jquery-slowlane.git
cd jquery-slowlane
node example/server.js
```
Point your browser to `localhost:8080` and you should see the example page.

## Installation
The easiest method is to use the [RawGit CDN](http://www.rawgit.com) and install like so:
```
<html>
    <head>
        <!-- Your Head Code -->
        <!-- FontAwesome is optional but suggested. -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdn.rawgit.com/helpdotcom/jquery-slowlane/f2e1654812271cf019610cdd98ac3b9bae2722fb/src/jquery-slowlane.css" />
    </head>
    <body>
        <!-- Make sure to load jQuery first. -->
        <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="https://cdn.rawgit.com/helpdotcom/jquery-slowlane/ff287aa7d1c9ad8ce4b5efc2aadb3d74d866bd3e/jquery-slowlane.min.js"></script>
    </body>
</html>
```

RawGit has a permanent cache, so the CDN references a specific commit.

## Usage
Putting your site into the slow-lane is very simple:

```
// Simply list the elements you wish to move to the slow-lane.
$('div, img, .my-class, #my-id').slowlane();
```

The following options can be set when initializing the slow-lane. The values below are the defaults.
```
$('section').slowlane({
    fontAwesome: false, // Use FontAwesome icons.
    customFloater: false, // Use your own floater. See below for styling details.
    loadTime: 5000, // The duration that an item takes to "load".
    adFadeTime: 500, // The duration that a fast-lane ad takes to fade out.
    zIndex: 200 // The z-index for the floater. Ads will be this z-index minus one.
});
```

## Styling

All classes and IDs used by jQuery-slowlane are prefixed by `_slowlane`. If you want to change the look of any of the plugin parts, simply [download the raw copy of jquery-slowlane.css](https://raw.githubusercontent.com/helpdotcom/jquery-slowlane/master/src/jquery-slowlane.css) and tinker around with the styles.

## Tweaking for Production

jQuery-slowlane was written quickly to provide an easy way for web masters to help spread awareness. Due to time constraints, the plugin has had minimal testing and may not work as expected, especially on mobile. That being said, the plugin tries to preserve any styling that has been implemented on the target elements.

We suggest you throw in the plugin as-is and see if it works well enough for you. If not, [download the raw copy of jquery-slowlane.js](https://raw.githubusercontent.com/helpdotcom/jquery-slowlane/master/src/jquery-slowlane.js) and tweak it to suit your needs.

## Thanks
Thank you to the [jQuery](http://jquery.com), [RawGit](http://rawgit.com), [Bootstrap](http://getbootstrap.com), [FontAwesome](http://fontawesome.io), and [Don't Break the Net](http://dontbreakthe.net) teams.
