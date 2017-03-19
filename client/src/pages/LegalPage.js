import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';

const LegalPage = () => {
  return (
    <div className="container">
      <HeaderContainer />

      <header className="subhead">
          <div className="container">
              <h1>Legal</h1>
              <p className="lead">Terms and Conditions</p>
          </div>

          <div className="container marketing">
            <div className="featurette">
                <h2 className="featurette-heading">Overview</h2>
                <p>
                    Neither MysticPaste.com, Mystic Coders, nor Andrew Lombardi (Company) make any warranty about your use of this site or the content
                    you'll find herein.  We don't guarantee uptime, usefulness, or any purpose at all.  Company shall not be held accountable for the accuracy
                    (or lack thereof) of content here nor damage done regarding how people use (or abuse) the content.
                </p>
                <p>
                    The following rules apply to every paste you make to Mystic Paste.  Whether you have read them or not it is understood that you have agreed
                    to these terms and are therefore bound by them.
                </p>
            </div>

            <div class="featurette">
                <h2 class="featurette-heading">Conditions of Use</h2>
                <p>
                    You are responsible and liable for anything pasted by you, and you agree not to do any of the following things:
                    </p><ul>
                        <li>Harrass, threaten, or say untrue things about anyone - that can result in hurt feelings and all sorts of other misunderstandings.</li>
                        <li>Break the law (especially Copyright law), any of it (local, state, national, international) - because that would be bad and you know it.</li>
                        <li>Paste anything that you have been told not to paste by the original author</li>
                        <li>Advertising of your goods or services is not allowed</li>
                    </ul>
                <p></p>
            </div>

            <div className="featurette">
                <h2 className="featurette-heading">Content</h2>
                <p>
                    You accept all risk and liability for things you paste. We do not screen pastes, although we do reserve the right to remove them
                    at will for any reason, especially content we deem inappropriate or in violation of this agreement.
                </p>
            </div>

            <div className="featurette">
                <h2 className="featurette-heading">Usage</h2>
                <p>
                    You accept all risk and liability. Mystic Paste is not responsible for any loss, damages, emotional breakdowns, psychiatrist visits,
                    or any other "bad thing" that comes about either directly or indirectly because of Mystic Paste. Any information you retrieve or use
                    from Mystic Paste is done at your own risk.
                </p>
            </div>

            <hr />
        </div>

      </header>

      <FooterContainer />
    </div>
  );
};

export default LegalPage;
