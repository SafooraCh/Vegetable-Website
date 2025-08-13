$(document).ready(function () {
  // Hero Carousel
  $(".hero-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    animateOut: "fadeOut",
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  // Testimonial Carousel
  $(".carousel-testimony").owlCarousel({
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1,
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000
        );
    }
  });

  // Add to cart functionality
  let cartCount = 0;
  $(".product-card .btn-success").on("click", function () {
    cartCount++;

    // Visual feedback
    $(this).text("Added!");
    $(this).removeClass("btn-success").addClass("btn-secondary");

    // Reset button after 1.5 seconds
    setTimeout(() => {
      $(this).text("Add to cart");
      $(this).removeClass("btn-secondary").addClass("btn-success");
    }, 1500);

    // Update cart count (if cart icon is present)
    // This assumes you have a cart icon in your navbar
    // If you don't have one, you can add it or remove this part
    if ($(".cart-count").length) {
      $(".cart-count").text(cartCount);
    }
  });

  // Countdown timer for Deal of the Day
  function updateCountdown() {
    // Set the target date (5 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
      document.getElementById("countdown").innerHTML =
        "<div class='expired'>Deal Expired!</div>";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerHTML = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerHTML = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerHTML = seconds
      .toString()
      .padStart(2, "0");
  }

  // Initialize countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Newsletter form submission
  $(".newsletter form").on("submit", function (e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();

    if (email) {
      // Show success message
      $(this).html(
        '<div class="alert alert-success">Thank you for subscribing with: ' +
          email +
          "</div>"
      );

      // Reset form after 3 seconds
      setTimeout(() => {
        $(this).html(`
          <input type="email" class="form-control mr-2 mb-2" placeholder="Enter your email" required />
          <button class="btn btn-dark mb-2">Subscribe</button>
        `);
      }, 3000);
    }
  });

  // Add animation on scroll
  $(window).scroll(function () {
    $(".feature-box, .product-card, .deal-container, .testimony-wrap").each(
      function () {
        const position = $(this).offset().top;
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (position < scrollPosition + windowHeight - 100) {
          $(this).addClass("animate__animated animate__fadeInUp");
        }
      }
    );
  });

  // Responsive adjustments
  function responsiveAdjustments() {
    const windowWidth = $(window).width();

    // Adjust hero text size on smaller screens
    if (windowWidth < 768) {
      $(".hero-text h1").css("font-size", "2rem");
      $(".hero-text p").css("font-size", "1rem");
    } else {
      $(".hero-text h1").css("font-size", "3.5rem");
      $(".hero-text p").css("font-size", "1.2rem");
    }

    // Adjust category section layout
    if (windowWidth < 768) {
      $(".category-section").addClass("mobile-layout");
    } else {
      $(".category-section").removeClass("mobile-layout");
    }

    // Adjust deal section layout
    if (windowWidth < 768) {
      $(".deal-container").addClass("mobile-layout");
    } else {
      $(".deal-container").removeClass("mobile-layout");
    }
  }

  // Call responsive adjustments on load and resize
  responsiveAdjustments();
  $(window).resize(function () {
    responsiveAdjustments();
  });

  // Sticky navigation background on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  // Add hover effect to product cards
  $(".product-card").hover(
    function () {
      $(this).addClass("shadow-lg");
    },
    function () {
      $(this).removeClass("shadow-lg");
    }
  );
});
