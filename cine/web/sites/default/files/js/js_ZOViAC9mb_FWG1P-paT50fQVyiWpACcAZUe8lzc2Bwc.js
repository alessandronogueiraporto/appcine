/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function (Drupal) {
  Drupal.theme.checkbox = function () {
    return "<input type=\"checkbox\" class=\"form-checkbox\"/>";
  };
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function (Drupal) {
  Drupal.theme.checkbox = function () {
    return '<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox"/>';
  };
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, Drupal) {
  Drupal.behaviors.ClickToSelect = {
    attach: function attach(context) {
      $(once('media-library-click-to-select', '.js-click-to-select-trigger', context)).on('click', function (event) {
        event.preventDefault();
        var $input = $(event.currentTarget).closest('.js-click-to-select').find('.js-click-to-select-checkbox input');
        $input.prop('checked', !$input.prop('checked')).trigger('change');
      });
      $(once('media-library-click-to-select', '.js-click-to-select-checkbox input', context)).on('change', function (_ref) {
        var currentTarget = _ref.currentTarget;
        $(currentTarget).closest('.js-click-to-select').toggleClass('checked', $(currentTarget).prop('checked'));
      }).on('focus blur', function (_ref2) {
        var currentTarget = _ref2.currentTarget,
          type = _ref2.type;
        $(currentTarget).closest('.js-click-to-select').toggleClass('is-focus', type === 'focus');
      });
      $(once('media-library-click-to-select-hover', '.js-click-to-select-trigger, .js-click-to-select-checkbox', context)).on('mouseover mouseout', function (_ref3) {
        var currentTarget = _ref3.currentTarget,
          type = _ref3.type;
        $(currentTarget).closest('.js-click-to-select').toggleClass('is-hover', type === 'mouseover');
      });
    }
  };
})(jQuery, Drupal);;
((Drupal, once) => {
  Drupal.behaviors.ginMediaLibrary = {
    attach: function attach() {
      Drupal.ginMediaLibrary.init();
    },
  };

  Drupal.ginMediaLibrary = {
    init: function () {
      once('media-library-select-all', '.js-media-library-view[data-view-display-id="page"]').forEach(el => {
        if (el.querySelectorAll('.js-media-library-item').length) {
          const header = document.querySelector('.media-library-views-form');
          const selectAll = document.createElement('label');
          selectAll.className = 'media-library-select-all';
          selectAll.innerHTML = Drupal.theme('checkbox') + Drupal.t('Select all media');
          selectAll.children[0].addEventListener('click', e => {
            const currentTarget = e.currentTarget;
            const checkboxes = currentTarget
              .closest('.js-media-library-view')
              .querySelectorAll('.js-media-library-item .form-boolean');

            checkboxes.forEach(checkbox => {
              const stateChanged = checkbox.checked !== currentTarget.checked;

              if (stateChanged) {
                checkbox.checked = currentTarget.checked;
                checkbox.dispatchEvent(new Event('change'));
              }
            });

            const announcement = currentTarget.checked ? Drupal.t('All @count items selected', {
              '@count': checkboxes.length
            }) : Drupal.t('Zero items selected');
            Drupal.announce(announcement);

            this.bulkOperations();
          });
          header.prepend(selectAll);
        }

        this.itemSelect();
      });
    },

    itemSelect: () => {
      document.querySelectorAll('.media-library-view .js-click-to-select-trigger, .media-library-view .media-library-item .form-checkbox')
        .forEach(trigger => {
          trigger.addEventListener('click', () => {
            const selectAll = document.querySelector('.media-library-select-all .form-boolean');
            const checkboxes = document.querySelectorAll('.media-library-view .media-library-item .form-boolean');
            const checkboxesChecked = document.querySelectorAll('.media-library-view .media-library-item .form-boolean:checked');

            if (selectAll && selectAll.checked === true && checkboxes.length !== checkboxesChecked.length) {
              selectAll.checked = false;
              selectAll.dispatchEvent(new Event('change'));
            } else if (checkboxes.length === Array.from(checkboxes).filter(el => el.checked === true).length) {
              selectAll.checked = true;
              selectAll.dispatchEvent(new Event('change'));
            }

            Drupal.ginMediaLibrary.bulkOperations();
          });
        });
    },

    bulkOperations: () => {
      const bulkOperations = document.querySelector('.media-library-view [data-drupal-selector*="edit-header"]');

      if (bulkOperations && document.querySelectorAll('.media-library-view .form-checkbox:checked').length > 0) {
        bulkOperations.classList.add('is-sticky');
      } else {
        bulkOperations.classList.remove('is-sticky');
      }
    },

  };
})(Drupal, once);
;