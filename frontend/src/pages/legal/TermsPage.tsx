import { Link } from 'react-router';
import { Seo } from '@/components/common/Seo';
import { LegalLayout } from './LegalLayout';
import { company } from '@/data/company';

export default function TermsPage() {
  return (
    <>
      <Seo path="/terms" title="Terms and Conditions" description="Terms that apply to your use of the FLINTORA website." breadcrumbs={[{ name: 'Terms and Conditions', path: '/terms' }]} />
      <LegalLayout title="Terms and Conditions" updated="25 November 2026" path="/terms">
        <p><em>This is a starting template. Please have it reviewed by a qualified adviser before launch.</em></p>
        <h2>Using this website</h2>
        <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>Information on this site</h2>
        <p>Content on this site is general information about {company.name} and its services. It is not professional advice for your specific situation.</p>
        <h2>Portfolio and concept studies</h2>
        <p>Projects labelled “Concept study” are self-initiated explorations for fictional brands. They are not client commissions and make no claims about results.</p>
        <h2>Intellectual property</h2>
        <p>The {company.name} name, spark mark, logo, text, artwork and code on this site belong to {company.name} or its licensors. You may share links to our pages, but you may not reproduce our materials without written permission.</p>
        <h2>Client work</h2>
        <p>Services we provide are governed by a separate written agreement. If that agreement conflicts with these terms, the agreement applies.</p>
        <h2>External links</h2>
        <p>We are not responsible for the content or practices of websites and services we link to.</p>
        <h2>Liability</h2>
        <p>To the extent permitted by law, we are not liable for any loss arising from your use of this website or reliance on its content.</p>
        <h2>Privacy</h2>
        <p>See our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
      </LegalLayout>
    </>
  );
}
