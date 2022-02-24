import { useMemo } from 'react';
import { LinkExtension } from 'remirror/extensions';

export const HyperlinkExtension = () => {
  const extension = new LinkExtension({ autoLink: true, defaultTarget: '_blank' });
  extension.addHandler('onClick', (_, data) => {
    window.open(data.href);
    return true;
  });
  return extension;
};

export default null;
