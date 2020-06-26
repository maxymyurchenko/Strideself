

jQuery(document).ready(function(){
  var element = document.getElementById("main_header");
  var mobile_menu = document.getElementById('mob_menu');
  window.onscroll = function(ev) {
    //console.log(window.scrollY);
    if(!$('body').hasClass('modal_opened')){
      if(window.scrollY >= 25) {
        element.classList.add("scrolled");
      }
      if(window.scrollY <= 1) {
        element.classList.remove("scrolled");
      }
    }

  };
  $('.mobile_toggle').on('click', function(){
    if(!$(this).hasClass('active')) {
      //console.log('menu open');
      $('header').addClass('fixed');
      $('body').addClass('noscroll');
      $('html').addClass('noscroll');
      $(this).addClass('active');
      $('.mobile_menu').css('top', $('header').height());
      $('.mobile_menu').show(300);
    } else {
      $('header').removeClass('fixed');
      $('body').removeClass('noscroll');
      $('html').removeClass('noscroll');
      $(this).removeClass('active');
      //$('.mobile_menu').css('top', $('header').height());
      $('.mobile_menu').hide(300);
    }
  });
  $('.open_popup').on('click', function(e){
    e.preventDefault();
    $('body').addClass('modal_opened');
    //$('html').addClass('noscroll');
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';

    $('.coach_form').show();
  });
  $('.close-mobile').on('click', function(e){
    jQuery('.coach_form').hide();
    $('body').removeClass('modal_opened');
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  });
  $(window).scroll(function(e){
    e.preventDefault;
    //console.log('scroll');
  });
});


var x, i, j, ji, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  if ($(x).hasClass('no_placeholder')) {
    ji = 0;
    a.setAttribute("class", "select-selected");
  } else {
    ji = 1;
    a.setAttribute("class", "select-selected no_selected");
  }

  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  $(a).attr('value', selElmnt.options[selElmnt.selectedIndex].getAttribute('value'));
  x[i].appendChild(a);

  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");

  for (j = ji; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    $(c).attr('value', selElmnt.options[j].getAttribute('value'));
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        $(a).attr('value', this.getAttribute('value'));
        var y, i, k, s, h;
        $('.select-selected').removeClass('no_selected');
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    jQuery('.custom-select').toggleClass("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
      jQuery('.custom-select').removeClass("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);



$('#main_form_about input, #main_form_about textarea').on('change textInput input', function () {
    var inpObj = document.getElementsByTagName("form")[0];
    if (!inpObj.checkValidity()) {
      //alert('notvalid');
      $('#main_form_about input[type="submit"]').removeClass('active');
    } else {
      if( $('.select-selected').hasClass('no_selected') == false) {
        $('#main_form_about input[type="submit"]').addClass('active');

        //coach_form
      }
    }
  });

$('#coach_form input, #coach_form textarea').on('change textInput input', function () {
    var inpObj = document.getElementById("coach_form");
    if (!inpObj.checkValidity()) {
      //alert('notvalid');
      $('#coach_form input[type="submit"]').removeClass('active');
    } else {
      //if( $('.select-selected').hasClass('no_selected') == false) {
        $('#coach_form input[type="submit"]').addClass('active');

        //coach_form
      //}
    }
  });
