import {IMAGES_ROOT, layoutSizes, layoutPaths, colorHelper, isMobile} from './theme.constants';

describe('theme.constants', () => {

  //specs
	it('should have IMAGES_ROOT', () => {
		expect(IMAGES_ROOT).toBeDefined();
		expect(IMAGES_ROOT).toEqual('assets/img/');
	});
	it('should have layoutSizes', () => {
		expect(layoutSizes.resWidthCollapseSidebar).toEqual(1500);
		expect(layoutSizes.resWidthHideSidebar).toEqual(500);
	});
	it('should have layoutPaths', () => {
		expect(layoutPaths.images.root).toEqual(IMAGES_ROOT);
		expect(layoutPaths.images.profile).toEqual(IMAGES_ROOT + 'app/profile/');
		expect(layoutPaths.images.logo).toEqual(IMAGES_ROOT + 'app/logo/');
		expect(layoutPaths.images.amMap).toEqual('assets/img/theme/vendor/ammap/');
		expect(layoutPaths.images.amChart).toEqual('assets/img/theme/vendor/amcharts/dist/amcharts/images/');
	});
	it('should have isMobile as false', () => {
		expect(isMobile()).toEqual(false);
	});
	it('should calculate hexToRgbA', () => {
		expect(colorHelper.hexToRgbA('#333333', .3)).toEqual('rgba(51,51,51,0.3)');
	});
	it('should calculate hexToRgbA - and throw an error if not hex', () => {
   		//must use arrow function for expect to capture exception
		expect(() => colorHelper.hexToRgbA('red', .3)).toThrowError('Bad Hex');
	});
	it('should calculate mix', () => {
		expect(colorHelper.mix('#333333', '#555555', 30)).toEqual('#4a4a4a');
	});
	it('should calculate tint', () => {
		expect(colorHelper.tint('#333333', 30)).toEqual('#707070');
	});
	it('should calculate shade', () => {
		expect(colorHelper.shade('#333333', 30)).toEqual('#232323');
	});

}) 

