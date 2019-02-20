var Main = {

	initReviews: function () {
		var owl = $('.reviews_block_container-wrapper .owl-carousel');
		owl.on('changed.owl.carousel', function(e) {
			Main.setOwlPagination(e);
		}).on('initialized.owl.carousel',function(e){
			Main.InitOwlPagination(e);
		});
		owl.owlCarousel({
			margin: 0,
			nav: false,
			dots:false,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});
	},
	initNews: function () {
		var owl = $('.news_container-content__list');
		owl.on('changed.owl.carousel', function(e) {
			Main.setOwlPagination(e);
		}).on('initialized.owl.carousel',function(e){
			Main.InitOwlPagination(e);
		});
		owl.owlCarousel({
			margin: 0,
			nav: false,
			dots:false,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 2
				}
			}
		});
	},
	initTabs: function () {
		var all_containers = $('.tabs_container');
		all_containers.find('.tabs_list a').on('click', function(e){
			e.stopPropagation();
			e.preventDefault();
			$(this).parent().parent().find('a').removeClass('active');
			$(this).addClass('active');
			var href =  $(this).attr('href');
			$(this).closest('.tabs_container').find('.tabs_items >div').hide();
			$(this).closest('.tabs_container').find(href).fadeIn('slow');
		})
	},
	init: function(){
		this.initCatalog();
		this.initReviews();
		this.initNews();

		this.initTabs();
	},

	InitOwlPagination: function(e){
		if (e.item) {
			var index = e.item.index - 1;
			var count = e.item.count;
			if (index > count) {
				index -= count;
			}
			if (index <= 0) {
				index += count;
			}
		}
		$(e.target).parent().find('.owl-custom-pagination').append('<div class="navigation"><img src="images/arrow-left.png" /><img src="images/arrow-right.png" /></div><div class="count"></div>');
		$(e.target).parent().find('.owl-custom-pagination .navigation img:first-child').on('click', function(){
			($(e.target).trigger('prev.owl.carousel'));
		});
		$(e.target).parent().find('.owl-custom-pagination .navigation img:nth-child(2)').on('click', function(){
			($(e.target).trigger('next.owl.carousel'));
		});
		$(e.target).parent().find('.owl-custom-pagination').find('.navigation');
		$(e.target).parent().find('.owl-custom-pagination .count').text(index + '/' + e.item.count)
	},
	setOwlPagination: function(e){

		if (!e.namespace || e.property.name != 'position') return ;

		if (e.item) {
			var index = e.item.index - 1;
			var count = e.item.count;
			if (index > count) {
				index -= count;
			}
			if (index <= 0) {
				index += count;
			}
		}

		$(e.target).parent().find('.owl-custom-pagination .count').text(index + '/' + e.item.count)
	},

	initCatalog: function(){

		//main categories slider
		var owl = $('.catalog_block_container-list');
		owl.children().each( function( index ) {
			$(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
		});


		owl.on('changed.owl.carousel', function(e) {
			Main.setOwlPagination(e);
		}).on('initialized.owl.carousel',function(e){
			Main.InitOwlPagination(e);
		});
		owl.owlCarousel({
			margin: 0,
			nav: false,
			dots:false,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});


		var opened = false;

		//init subcategories
		$('.catalog_block_container-list__item-wrapper-text').on('click', 'button', function(){
			var container = $(this).closest('.catalog_block_container-list__item');
			var n = container.data('position');
			owl.trigger('to.owl.carousel', n);
			container.closest('.catalog_block_container').find('.catalog_block_container-subcategories').addClass('opened');
			setTimeout(function(){
				opened = true;
			}, 300);
			var position = $(this).closest('.catalog_block_container-list__item').data('position');

			$.each($('div[data-position='+position+']'),function(key, val){
				var img =	$(val).find('>img');
				//bordered div
				$(val).find('>div').addClass('without_border');
				img.attr('src',img.data('image-active'));
			});
		});
		$('.catalog_block_container').on('click','.catalog_block_container-subcategories__close',function(e){
			e.stopPropagation();
			e.preventDefault();
			$(this).parent().removeClass('opened');

			$.each($('.catalog_block_container-list__item'),function(key, val){
				var img =	$(val).find('>img');
				$(val).find('>div').removeClass('without_border');
				img.attr('src',img.data('image'));

			});
			setTimeout(function(){
				opened = false;
			}, 300);

		})

		//remove subcategories if click on body

		$('body').on('click', function(e){
			if(opened){
				if($(e.target).closest('.catalog_block_container-subcategories.opened').length == 0){
					$.each($('.catalog_block_container-list__item'),function(key, val){
						var img =	$(val).find('>img');
						img.attr('src',img.data('image'));
						$(val).find('>div').removeClass('without_border');
					});
					if($(e.target).parent().hasClass('catalog_block_container-list__item-wrapper-text')){
						var position = $(e.target).parent().parent().parent().data('position');
						$.each($('div[data-position='+position+']'),function(key, val){
							var img =	$(val).find('>img');
							img.attr('src',img.data('image-active'));
							$(val).find('>div').addClass('without_border');
						});
						return ;
					}

					setTimeout(function(){
						opened = false;
					}, 300);
					$('.catalog_block_container-subcategories.opened').removeClass('opened');
				}
			}

		})
	},

	initProductsList: function(){
		var owl = $('#product_banner');
		owl.owlCarousel({
			margin: 0,
			nav: true,
			dots:false,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 4
				}
			}
		});

		$('#product_banner .raty').raty({
			starType: 'i',
			readOnly: true,
			score: 3.5,/*function() {
				return $(this).attr('data-score');
			}*/
		});
	}
};

$(document).ready(function(){


	Main.init();
});