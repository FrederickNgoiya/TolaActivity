import IpttHome from '../pages/iptt.page';
import LoginPage from '../pages/login.page';
import NavBar from '../pages/navbar.page';
import Util from '../lib/testutil';
import { expect } from 'chai';
'use strict';

/**
 * IPTT report: IPTT landing page
 * Tests from mc/issues/119
 */
describe('IPTT: IPTT landing page', function() {
    before(function() {
        // Disable timeouts
        this.timeout(0);
        browser.windowHandleMaximize();
        let parms = Util.readConfig();

        LoginPage.open(parms.baseurl);
        if (parms.baseurl.includes('mercycorps.org')) {
            LoginPage.username = parms.username;
            LoginPage.password = parms.password;
            LoginPage.login.click();
        } else if (parms.baseurl.includes('localhost')) {
            LoginPage.googleplus.click();
            if (LoginPage.title != 'TolaActivity') {
                LoginPage.gUsername = parms.username + '@mercycorps.org';
                LoginPage.gPassword = parms.password;
            }
        }        
    });

    it('should exist', function() {
        expect('Indicator Performance Tracking Table' == IpttHome.title);
    });

    it('should have a Program indicator overview report', function() {
        expect(browser.isVisible('form#id_form_program_indicator_overview'));
    });

    it('should have a Program target overview report', function() {
        expect(browser.isVisible('form#id_form_program_target_overview'));
    });
}); 