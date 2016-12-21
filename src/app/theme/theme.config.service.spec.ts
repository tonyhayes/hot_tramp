import { ThemeConfigService } from './theme.config.service';
import { colorHelper } from './theme.constants';

describe('ThemeConfigService', () => {

	const cp = new ThemeConfigService();
  //specs
	it('should have a ThemeConfigService', () => {
		expect(cp).toBeDefined();
	});
	it('should have basic theme', () => {
		expect(cp.basic.default).toEqual('#ffffff');
		expect(cp.basic.defaultText).toEqual('#666666');
		expect(cp.basic.border).toEqual('#dddddd');
		expect(cp.basic.borderDark).toEqual('#aaaaaa');
	});
	it('should have colorScheme theme', () => {
		expect(cp.colorScheme.primary).toEqual('#00abff');
		expect(cp.colorScheme.info).toEqual('#40daf1');
		expect(cp.colorScheme.success).toEqual('#8bd22f');
		expect(cp.colorScheme.warning).toEqual('#e7ba08');
		expect(cp.colorScheme.danger).toEqual('#f95372');
	});
	it('should have dashboardColors theme', () => {
		expect(cp.dashboardColors.blueStone).toEqual('#40daf1');
		expect(cp.dashboardColors.surfieGreen).toEqual('#00abff');
		expect(cp.dashboardColors.silverTree).toEqual('#1b70ef');
		expect(cp.dashboardColors.gossip).toEqual('#3c4eb9');
		expect(cp.dashboardColors.white).toEqual('#ffffff');
	});
	it('should have conf theme', () => {
		expect(cp.conf.theme.name).toEqual('ng2');
		expect(cp.conf.colors.default).toEqual(cp.basic.default);
		expect(cp.conf.colors.defaultText).toEqual(cp.basic.defaultText);
		expect(cp.conf.colors.border).toEqual(cp.basic.border);
		expect(cp.conf.colors.borderDark).toEqual(cp.basic.borderDark);

		expect(cp.conf.colors.primary).toEqual(cp.colorScheme.primary);
		expect(cp.conf.colors.info).toEqual(cp.colorScheme.info);
		expect(cp.conf.colors.success).toEqual(cp.colorScheme.success);
		expect(cp.conf.colors.warning).toEqual(cp.colorScheme.warning);
		expect(cp.conf.colors.danger).toEqual(cp.colorScheme.danger);

		expect(cp.conf.colors.primaryLight).toEqual(colorHelper.tint(cp.colorScheme.primary, 30));
		expect(cp.conf.colors.infoLight).toEqual(colorHelper.tint(cp.colorScheme.info, 30));
		expect(cp.conf.colors.successLight).toEqual(colorHelper.tint(cp.colorScheme.success, 30));
		expect(cp.conf.colors.warningLight).toEqual(colorHelper.tint(cp.colorScheme.warning, 30));
		expect(cp.conf.colors.dangerLight).toEqual(colorHelper.tint(cp.colorScheme.danger, 30));

		expect(cp.conf.colors.primaryDark).toEqual(colorHelper.shade(cp.colorScheme.primary, 15));
		expect(cp.conf.colors.infoDark).toEqual(colorHelper.shade(cp.colorScheme.info, 15));
		expect(cp.conf.colors.successDark).toEqual(colorHelper.shade(cp.colorScheme.success, 15));
		expect(cp.conf.colors.warningDark).toEqual(colorHelper.shade(cp.colorScheme.warning, 15));
		expect(cp.conf.colors.dangerDark).toEqual(colorHelper.shade(cp.colorScheme.danger, 15));

		expect(cp.conf.colors.dashboard.blueStone).toEqual(cp.dashboardColors.blueStone);
		expect(cp.conf.colors.dashboard.surfieGreen).toEqual(cp.dashboardColors.surfieGreen);
		expect(cp.conf.colors.dashboard.silverTree).toEqual(cp.dashboardColors.silverTree);
		expect(cp.conf.colors.dashboard.gossip).toEqual(cp.dashboardColors.gossip);
		expect(cp.conf.colors.dashboard.white).toEqual(cp.dashboardColors.white);

		expect(cp.conf.colors.custom.dashboardLineChart).toEqual(cp.basic.defaultText);
		expect(cp.conf.colors.custom.dashboardPieChart).toEqual(colorHelper.hexToRgbA(cp.basic.defaultText, 0.8));
	});
	it('should get the config theme object', () => {
		expect(cp.get()).toEqual(cp.conf);
	});
	it('should change the config theme object', () => {
		const cpfg = cp.get();
		cp.changeTheme(cpfg)
		expect(cpfg).toEqual(cp.conf);
	});
	it('should change the config theme color object', () => {
		const cpfg = cp.get();
		cp.changeColors(cpfg.colors)
		expect(cpfg.colors).toEqual(cp.conf.colors);
	});

}) 

