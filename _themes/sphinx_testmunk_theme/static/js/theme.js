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
    $(".admonition.danger").children(".first").html("Troubleshooting")

    // Add chevron to the right of the admonitions' title bar
    $(".admonition-title").append('<i class="fa ' + showMark + '" style="align-content:' +
        ' right;position: inherit;float: right;"></i>');

    // Admonitions start retracted
    $("div.admonition").each(toggleAdmBody);

    // Clicking the title shows the body of the admonition
    $(".admonition").click(toggleAdmBody);

    // Make all external links open in a new window
    $("a.reference.external").attr("target", "_blank")

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
