// Code for toggling the display of the admonition body

// Variables for the Font Awesome icons used for hide/show
var hideMark = "fa-chevron-up";
var showMark = "fa-chevron-down";

function toggleAdmBody() {
    var body = $(this).children().not(".admonition-title");

    if (body.is(":visible")){
        body.hide(300);
        $(this).css("padding-bottom", "0px")
        $(this).children().children("." + hideMark).attr('class', 'fa ' + showMark);
    } else {
        body.show(300);
        $(this).css("padding-bottom", "12px")
        $(this).children().children("." + showMark).attr('class', 'fa ' + hideMark);
    }
}

// Hides the screenshot that calls the function
function hideSS() {
    if ($(this).attr("alt") == "Screenshot") {
        var imgLink = $(this).attr("src");
        $(this).replaceWith("<a class='collapsedImg' imgsrc='" + imgLink + "' onclick='$(this).each(showSS);'>See screenshot</a>");
    }
}

// Shows the screenshot that calls the function
function showSS() {
    var imgLink = $(this).attr("imgsrc");
    $(this).replaceWith("<img alt='" + imgLink + "' src='" + imgLink + "' onclick='$(this).each(hideSS);'>");
}


$( document ).ready(function() {

    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
      $("[data-toggle='wy-nav-shift']").toggleClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
      $("[data-toggle='wy-nav-shift']").removeClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    $(document).on('click', "[data-toggle='rst-current-version']", function() {
      $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });  
    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");

    // Make the danger admonition display troubleshooting instead
    $(".admonition.danger").children(".first").html("Troubleshooting");

    // Copies the last paragraph of an admonition to it's title and deletes it
    // If it is a teststep admonition it completely replaces the title, else it
    // gets appended to the admonition name
    $("div.admonition").each(function(){
        if ($(this).hasClass("admonition-teststep-android-ios") ||
            $(this).hasClass("admonition-teststep-ios-android") ||
            $(this).hasClass("admonition-teststep-ios") ||
            $(this).hasClass("admonition-teststep-android") ||
            $(this).hasClass("admonition-teststep") ) {

            var title = $(this).children(".last").html();
            $(this).children(".admonition-title").html(title);
            $(this).children(".last").remove();

        } else {

            var title = $(this).children(".last").html();
            $(this).children(".admonition-title").append( ": " + title );
            $(this).children(".last").remove();
        }
    });

    // Add chevron to the right of the admonitions' title bar
    $(".admonition-title").append('<i class="fa ' + showMark + '" style="align-content:' +
        ' right;position: inherit;float: right;"></i>');

    // Admonitions start retracted
    $("div.admonition").each(toggleAdmBody);

    // Clicking the title shows the body of the admonition
    $(".admonition").click(toggleAdmBody);

    // Make all external links open in a new window
    $("a.reference.external").attr("target", "_blank");

    // Initialize image expanding and retracting
    $(".rst-content img").each(hideSS);

    // Add Android icon next to iOS's in teststeps that are compatible with both
    $(".admonition-teststep-ios-android .admonition-title")
        .prepend('<i class="fa fa-android second-platform-icon"></i>');
    $(".admonition-teststep-android-ios .admonition-title")
        .prepend('<i class="fa fa-android second-platform-icon"></i>');



    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     *
     * Code source: http://www.callmenick.com/2013/04/22/single-page-site-with-smooth-scrolling-highlighted-link-and-fixed-navigation/
     */
    var aChildren = $(".toctree-l1.current").children("ul").children().children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values
 
    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();
 
        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }
 
        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });

});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function () {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function () {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));
