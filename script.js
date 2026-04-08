$(document).ready(function () {

  // ===== YEAR =====
  $('#year').text(new Date().getFullYear());

  // ===== NAVBAR SCROLL =====
  $(window).scroll(function () {
    if ($(this).scrollTop() > 60) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });

  // ===== SMOOTH SCROLL (navbar links) =====
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 600, 'swing');
      // Close mobile menu
      $('#navMenu').collapse('hide');
    }
  });

  // ===== TYPING EFFECT =====
  var titles = [
    'Frontend Developer',
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Bootstrap Expert',
    'JavaScript Ninja'
  ];
  var titleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 90;

  function typeEffect() {
    var current = titles[titleIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    $('#typedText').html(
      '&gt; ' + current.substring(0, charIndex) + '<span class="typed-cursor">|</span>'
    );

    if (!isDeleting && charIndex === current.length) {
      setTimeout(function () { isDeleting = true; }, 1800);
      typeSpeed = 55;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 90;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // ===== SCROLL REVEAL =====
  function revealOnScroll() {
    $('.reveal').each(function () {
      var elemTop = $(this).offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (elemTop < viewBottom - 60) {
        $(this).addClass('visible');
      }
    });
  }

  // Add reveal class to sections
  $('.about-card, .about-text, .skill-card, .project-card, ' +
    '.contact-info-box, .contact-form-box, .section-heading, .section-tag').addClass('reveal');

  $(window).scroll(revealOnScroll);
  revealOnScroll(); // run on load

  // ===== SKILL BARS =====
  function animateSkillBars() {
    $('.skill-fill').each(function () {
      var el = $(this);
      var parentTop = el.closest('.skill-card').offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (parentTop < viewBottom - 40 && !el.hasClass('animated')) {
        el.addClass('animated');
        el.animate({ width: el.data('width') + '%' }, 1200);
      }
    });
  }
  $(window).scroll(animateSkillBars);
  animateSkillBars();

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    $('.stat-num').each(function () {
      var el = $(this);
      var parentTop = el.closest('.about-stats').offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (parentTop < viewBottom - 40 && !el.hasClass('counted')) {
        el.addClass('counted');
        var target = parseInt(el.data('count'));
        $({ count: 0 }).animate({ count: target }, {
          duration: 1500,
          easing: 'swing',
          step: function () {
            el.text(Math.floor(this.count));
          },
          complete: function () {
            el.text(target);
          }
        });
      }
    });
  }
  $(window).scroll(animateCounters);
  animateCounters();

  // ===== PROJECT FILTER =====
  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.project-item').show().removeClass('hidden').css('opacity', 0).animate({ opacity: 1 }, 400);
    } else {
      $('.project-item').each(function () {
        if ($(this).data('category') === filter) {
          $(this).show().removeClass('hidden').css('opacity', 0).animate({ opacity: 1 }, 400);
        } else {
          $(this).animate({ opacity: 0 }, 300, function () {
            $(this).hide().addClass('hidden');
          });
        }
      });
    }
  });

  // ===== CONTACT FORM =====
  $('#sendBtn').on('click', function () {
    var name    = $.trim($('#cName').val());
    var email   = $.trim($('#cEmail').val());
    var subject = $.trim($('#cSubject').val());
    var msg     = $.trim($('#cMsg').val());
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $('#formMsg').hide().removeClass('success-msg error-msg');

    if (!name || !email || !subject || !msg) {
      $('#formMsg')
        .text('⚠ Please fill in all fields.')
        .addClass('error-msg')
        .fadeIn(300);
      return;
    }

    if (!emailRegex.test(email)) {
      $('#formMsg')
        .text('⚠ Please enter a valid email address.')
        .addClass('error-msg')
        .fadeIn(300);
      return;
    }

    // Simulate sending
    var btn = $(this);
    btn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...').prop('disabled', true);

    setTimeout(function () {
      btn.html('<i class="fas fa-check me-2"></i>Message Sent!').css('background', '#22c55e');
      $('#cName, #cEmail, #cSubject, #cMsg').val('');
      $('#formMsg')
        .text('✅ Your message has been sent! I\'ll get back to you soon.')
        .addClass('success-msg')
        .fadeIn(300);

      setTimeout(function () {
        btn.html('<i class="fas fa-paper-plane me-2"></i>Send Message')
           .css('background', '')
           .prop('disabled', false);
        $('#formMsg').fadeOut(400);
      }, 3500);
    }, 1800);
  });

  // ===== ACTIVE NAV ON SCROLL =====
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop() + 100;
    $('section[id]').each(function () {
      var sectionTop = $(this).offset().top;
      var sectionBottom = sectionTop + $(this).outerHeight();
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        var id = $(this).attr('id');
        $('.nav-link').removeClass('active-link');
        $('.nav-link[href="#' + id + '"]').addClass('active-link');
      }
    });
  });

});

// ===== DOWNLOAD CV (placeholder) =====
document.getElementById('downloadCV') && document.getElementById('downloadCV').addEventListener('click', function(e){
  e.preventDefault();
  alert('CV download coming soon! Please contact Noman directly.');
});
