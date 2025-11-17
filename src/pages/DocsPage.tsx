import { CopyButton } from "../components/ui/copy-button";

export function DocsPage() {
  const codeNoStreaming = `from openai import OpenAI

client = OpenAI(
    base_url="https://ai.nahcrof.com/v2",
    api_key="api-key-here"
)
response = client.chat.completions.create(
    model="MODEL-FROM-LIST",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
print(response.choices[0].message.content)`;

  const codeStreaming = `from openai import OpenAI

client = OpenAI(
    base_url="https://ai.nahcrof.com/v2",
    api_key="api-key-here"
)

response = client.chat.completions.create(
    model="MODEL-FROM-LIST",
    messages=[
        {"role": "user", "content": "Howdy there! How are you?"}
    ],
    stream=True  # Enable streaming
)

for chunk in response:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`;

  return (
    <div className="px-8 pt-9 pb-0 h-full">
       <div className="w-full rounded-md h-[calc(100vh-8.5rem)] flex flex-col overflow-visible relative">
        <div className="flex flex-col h-full">

          <div className="flex-1 overflow-y-auto px-16 py-12 max-w-4xl mx-auto break-words">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">API/SDK</h2>
           <p className="mb-4 break-words">
            CrofAI supports the OpenAI SDK for LLM inference. Below will be a python example.
          </p>

           <h3 className="text-xl font-medium mb-2">Python (No Streaming)</h3>
            <pre className="bg-neutral-950 text-white p-4 rounded-md overflow-x-auto max-w-full whitespace-pre-wrap break-words mb-6 relative">
             <CopyButton text={codeNoStreaming} />
             <code>{codeNoStreaming}</code>
           </pre>

           <h3 className="text-xl font-medium mb-2">Python (With Streaming)</h3>
            <pre className="bg-neutral-950 text-white p-4 rounded-md overflow-x-auto max-w-full whitespace-pre-wrap break-words mb-6 relative">
             <CopyButton text={codeStreaming} />
             <code>{codeStreaming}</code>
           </pre>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Supported Parameters</h2>
           <ul className="list-disc list-inside space-y-1 break-words">
            <li><code>max_tokens</code></li>
            <li><code>temperature</code></li>
            <li><code>top_p</code></li>
            <li><code>stop</code></li>
            <li><code>seed</code></li>
            <li><code>tools</code></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">AI models / API MODEL-NAME</h2>
          <p>These are available on the <a href="/pricing" className="text-primary hover:underline">/pricing page</a></p>
        </section>

        <section className="pb-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">429 Error codes</h2>
          <p>
            By default, CrofAI does not serve 429 error codes because we do not intend on rate limiting users. However, in the event that a user is registered as a likely bot account (this is unrelated to the amount of usage you handle) your account will only receive 429 error codes. If this is happening to you, contact support and we will unblock your account
          </p>
        </section>
      </div>
      </div>
      <div className="absolute inset-0 rounded-md animate-gradient-glow pointer-events-none"></div>
    </div>
    </div>
  );
}

