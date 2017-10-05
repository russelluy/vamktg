define(['jquery', 'jquery-custom-select'], function ($) {
    'use strict';
    // Custom select box
    $('select.selector-selectbox').customSelect();
    $('select.nav-drop-down-selectbox').customSelect();
    $('select.drop-down-selectbox').customSelect();
    $('.header-selector-selectbox').customSelect();
    $('.nav-row-selectbox.is-trigger').customSelect();

    (function ($) {
        var resizeTimer; // Set resizeTimer to empty so it resets on page load

        function resizeFunction() {
            //DropDown
            $('.drop-down-selectbox').trigger('render');

            //Show HeaderSelector
            $('.header-selector-selectbox').trigger('render');
          }

        // On resize, run the function and reset the timeout
        $(window).resize(function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resizeFunction, 250);
        });


        // resize select box on option change
        $('.header-selector-selectbox').on('change', function () {
          $(this).trigger('render');
        });

        //Auto-Locations for combobox
        function changeLocationNavDropDown() {
          document.location.href = $('select.nav-drop-down-selectbox').val();
        }

        $('select.nav-drop-down-selectbox').on('change', changeLocationNavDropDown);

        //NAV ROW
        $('.nav-row-selectbox.is-trigger').on('change', function () {
          document.location.href = $(this).val();
        });

        $('.nav-row-container__arrow.is-trigger').on('click', function (e) {
          e.preventDefault();
          $(this).closest('.nav-row-container').toggleClass('is-expanded');
        });

      })(jQuery);
  });