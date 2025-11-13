export function PrivacyPage() {
  return (
    <div className="px-8 pt-9 pb-0 h-full">
      <div className="container mx-auto max-w-4xl rounded-md h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden relative">
        <div className="flex flex-col h-full">

          <div className="flex-1 overflow-y-auto px-16 py-12">
          <h1 className="text-3xl font-bold mb-8 gradient-text">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-8">Last Updated: July 2025</p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
            <p className="mb-6">
              This privacy policy ("Privacy Policy") outlines the rules for using data collected when you ("you" or "your") use our services, visit our websites including https://ai.nahcrof.com ("Website"), use our APIs ("APIs"), and other services (collectively referred to as the "Services").
            </p>
            <p className="mb-6">
              This policy describes the types of information we may collect from you or that you may provide when you use our Services, and our practices for collecting, using, maintaining, protecting, and disclosing that information. All capitalized terms in this Privacy Policy are defined in the Terms of Service found on our Website.
            </p>
            <p className="mb-8">
              By accessing or using our Services, you agree to this Privacy Policy. We will notify you when we update this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">What Data We DO NOT Collect</h2>
            <h3 className="text-xl font-medium mb-3">We Explicitly DO NOT Collect:</h3>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li><strong>Your input prompts or messages sent to our AI services</strong></li>
              <li><strong>AI-generated responses or outputs</strong></li>
              <li><strong>Conversation history or chat logs</strong></li>
              <li><strong>Content of your interactions with our AI models</strong></li>
              <li><strong>Any personal information contained within your prompts</strong></li>
            </ul>
            <p className="mb-8 font-semibold">
              Your conversations are processed in real-time and are not stored, logged, or accessible to us in any way.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Information We DO Collect</h2>
            <p className="mb-4">We only collect the minimum information necessary to provide our services:</p>
            <h3 className="text-xl font-medium mb-3">Account Information (Required for Service):</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Email address (for account creation and billing)</li>
              <li>Hashed passwords (securely encrypted)</li>
              <li>Account creation date</li>
              <li>Subscription status and billing information</li>
            </ul>
            <h3 className="text-xl font-medium mb-3">Usage Metrics (Required for Billing):</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Number of API requests made</li>
              <li>Request timestamps (for rate limiting and billing)</li>
              <li>Service usage statistics (aggregated, non-personal)</li>
            </ul>
            <h3 className="text-xl font-medium mb-3">Technical Information (Required for Service Operation):</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>IP addresses (for security and rate limiting)</li>
              <li>Browser type and version (for compatibility)</li>
              <li>Device information (for optimization)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-primary">How We Collect Information</h2>
            <p className="mb-4">We collect information in the following ways:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>When you create an account on our platform</li>
              <li>When you make API requests (we only log request counts, not content)</li>
              <li>When you visit our website (standard web analytics)</li>
              <li>When you process payments through Stripe (handled by Stripe, not stored by us)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-primary">How We Use Your Information</h2>
            <p className="mb-4">We use the limited information we collect only for:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Providing and maintaining our AI services</li>
              <li>Processing payments and managing subscriptions</li>
              <li>Monitoring usage for billing purposes</li>
              <li>Ensuring service security and preventing abuse</li>
              <li>Communicating important service updates</li>
              <li>Complying with legal obligations</li>
            </ul>
            <p className="mb-4 font-semibold">We do NOT use your data for:</p>
            <ul className="list-disc list-inside mb-8 space-y-2">
              <li>Training AI models</li>
              <li>Marketing or advertising</li>
              <li>Selling to third parties</li>
              <li>Creating user profiles beyond basic account information</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, except:
            </p>
            <h3 className="text-xl font-medium mb-3">Service Providers:</h3>
            <p className="mb-4">Stripe for payment processing (they handle payment data according to their privacy policy)</p>
            <h3 className="text-xl font-medium mb-3">Legal Requirements:</h3>
            <p className="mb-4">When required by law, court order, or to protect our rights and safety</p>
            <h3 className="text-xl font-medium mb-3">Business Transfers:</h3>
            <p className="mb-4">In the event of a merger or acquisition (users will be notified)</p>
            <p className="mb-8 font-semibold">
              We never share conversation content because we don't collect it.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Data Security</h2>
            <p className="mb-4">We implement industry-standard security measures:</p>
            <ul className="list-disc list-inside mb-8 space-y-2">
              <li>Passwords are hashed using secure algorithms</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Secure servers with regular backups</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correct:</strong> Update or correct your account information</li>
              <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
              <li><strong>Export:</strong> Download your account data</li>
              <li><strong>Restrict:</strong> Limit how we process your data</li>
            </ul>
            <p className="mb-8">
              To exercise these rights, contact us at <a href="mailto:privacy@nahcrof.com" className="text-primary hover:underline">privacy@nahcrof.com</a> or manage your account through our dashboard.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Data Retention</h2>
            <p className="mb-4">We retain your data only as long as necessary:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li><strong>Account Data:</strong> Until you delete your account</li>
              <li><strong>Usage Metrics:</strong> For billing and legal compliance (typically 7 years)</li>
              <li><strong>Conversation Data:</strong> We don't retain this - it's processed in real-time only</li>
            </ul>
            <p className="mb-8">
              After account deletion, all personal data is permanently removed within 30 days.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              California residents have additional rights under the CCPA:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale (we don't sell data)</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>
            <p className="mb-8 font-semibold">
              CrofAI has not disclosed, sold, or shared any personal information with third parties for business or commercial purposes in the past twelve (12) months, and will not do so in the future.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">International Data Transfers</h2>
            <p className="mb-6">
              Your data may be processed in the United States. We ensure appropriate safeguards are in place for international transfers and comply with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Children's Privacy</h2>
            <p className="mb-6">
              Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside mb-8 space-y-2">
              <li>Updating the "Last Updated" date at the top of this policy</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:privacy@nahcrof.com" className="text-primary hover:underline">privacy@nahcrof.com</a></li>
              <li><strong>Website:</strong> <a href="https://ai.nahcrof.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://ai.nahcrof.com</a></li>
            </ul>
            <p>
              We are committed to addressing your privacy concerns and will respond to your inquiries promptly.
            </p>
          </div>
        </div>
        </div>
        <div className="absolute inset-0 rounded-md animate-gradient-glow pointer-events-none"></div>
      </div>
    </div>
  );
}

export default PrivacyPage;