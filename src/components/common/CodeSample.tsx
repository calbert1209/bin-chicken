import './CodeSample.css';

export const CodeSample = ({ content}: {content: string}) => (
  <pre><code className="codeSample">{content}</code></pre>
);

export const HashSample = ({ content}: {content: string}) => (
  <CodeSample content={`${content}...`} />
)