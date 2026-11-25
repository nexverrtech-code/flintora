import { Link } from 'react-router';
import { Seo } from '@/components/common/Seo';
import { LegalLayout } from './LegalLayout';
import { company } from '@/data/company';

export default function PrivacyPage() {
  return (
    <>
      <Seo path="/privacy-policy" title="Privacy Policy" description="How the FLINTORA website handles your information: no accounts, no tracking cookies and planning tools that run entirely in your browser." breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />
      <LegalLayout title="Privacy Policy" updated="25 November 2026" path="/privacy-policy">
        <p><em>This policy describes how this website works today. Please have it reviewed by a qualified adviser for the regions you operate in before launch, and update it if you add analytics or other services.</em></p>
        <h2>Summary</h2>
        <p>This website does not have user accounts, does not use advertising or tracking cookies and does not send your form entries to a server. The planning tools and the project form run entirely in your browser.</p>
        <h2>Who we are</h2>
        <p>{company.name} operates this website.{company.contact.email && <> You can reach us at <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>.</>}</p>
        <h2>Information you enter</h2>
        <ul>
          <li><strong>Start a Project form.</strong> What you type stays in your browser. It is only shared if you choose to send it, for example by continuing to WhatsApp, opening an email or pasting it into an external form. From that point the privacy terms of that service also apply.</li>
          <li><strong>Brand Transformation Studio, Digital Presence Assessment, Budget Estimator and Creative Brief Builder.</strong> Your answers are processed in your browser and are not sent to us.</li>
        </ul>
        <h2>Storage on your device</h2>
        <p>We use your browser’s local storage, not cookies, for a few conveniences:</p>
        <ul>
          <li><code>flintora:brand-studio</code> keeps your Brand Studio answers, only if you tick “Remember my answers on this device”.</li>
          <li><code>flintora:project-prefill</code> carries answers from a planning tool into the project form for the current browser tab only.</li>
        </ul>
        <p>You can clear these at any time in your browser settings.</p>
        <h2>Hosting</h2>
        <p>Our hosting provider may keep standard server logs, such as IP address, browser type and the pages requested, for security and reliability.</p>
        <h2>Fonts and third parties</h2>
        <p>Fonts and images are served from this website. We do not load third-party trackers. Links to other services, such as WhatsApp or social networks, are only followed if you click them.</p>
        <h2>Your rights</h2>
        <p>If you have shared information with us, you can ask us to access, correct or delete it. {company.contact.email ? <>Email <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>.</> : <>Contact us through the channel you used to reach us.</>}</p>
        <h2>Changes</h2>
        <p>If this site starts using analytics or other services, this policy will be updated first. See also our <Link to="/terms">Terms and Conditions</Link>.</p>
      </LegalLayout>
    </>
  );
}
