import React from 'react';

import { Header, Container } from 'semantic-ui-react';

import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';

const LegalPage = () => {
  return (
    <div>
      <HeaderContainer />
        <Container>

        <Header size="huge">Legal</Header>
        <Header size="large">Terms and Conditions</Header>


        <Header size="medium">Overview</Header>
        <p>
            Neither MysticPaste.com, Mystic Coders, nor Andrew Lombardi (Company) make any warranty about your use of this site or the content
            you'll find herein.  We don't guarantee uptime, usefulness, or any purpose at all.  Company shall not be held accountable for the accuracy
            (or lack thereof) of content here nor damage done regarding how people use (or abuse) the content.
        </p>
        <p>
            The following rules apply to every paste you make to Mystic Paste.  Whether you have read them or not it is understood that you have agreed
            to these terms and are therefore bound by them.
        </p>

        <Header size="medium">Conditions of Use</Header>

        <p>
            You are responsible and liable for anything pasted by you, and you agree not to do any of the following things:
            </p><ul>
                <li>Harrass, threaten, or say untrue things about anyone - that can result in hurt feelings and all sorts of other misunderstandings.</li>
                <li>Break the law (especially Copyright law), any of it (local, state, national, international) - because that would be bad and you know it.</li>
                <li>Paste anything that you have been told not to paste by the original author</li>
                <li>Advertising of your goods or services is not allowed</li>
            </ul>
        <p></p>

        <Header size="medium">Content</Header>
        <p>
            You accept all risk and liability for things you paste. We do not screen pastes, although we do reserve the right to remove them
            at will for any reason, especially content we deem inappropriate or in violation of this agreement.
        </p>

        <Header size="medium">Usage</Header>
        <p>
            You accept all risk and liability. Mystic Paste is not responsible for any loss, damages, emotional breakdowns, psychiatrist visits,
            or any other "bad thing" that comes about either directly or indirectly because of Mystic Paste. Any information you retrieve or use
            from Mystic Paste is done at your own risk.
        </p>

        <hr />
        </Container>
      <FooterContainer />
    </div>
  );
};

export default LegalPage;
