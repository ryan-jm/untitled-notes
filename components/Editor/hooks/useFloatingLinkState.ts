import { useAttrs, useChainedCommands, useCurrentSelection, useUpdateReason } from '@remirror/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { createMarkPositioner } from 'remirror/extensions';

import useLinkShortcut from './useLinkShortcut';

const useFloatingLinkState = () => {
  const chain = useChainedCommands();
  const { isEditing, shortcut, setIsEditing } = useLinkShortcut();
  const { to, empty } = useCurrentSelection();

  const url = (useAttrs().link()?.href as string) ?? '';
  const [href, setHref] = useState<string>(url);

  const linkPositioner = useMemo(() => createMarkPositioner({ type: 'link' }), []);

  const onRemove = useCallback(() => {
    return chain.removeLink().focus().run();
  }, [chain]);

  const updateReason = useUpdateReason();

  useLayoutEffect(() => {
    if (!isEditing) {
      return;
    }

    if (updateReason.doc || updateReason.selection) {
      setIsEditing(false);
    }
  }, [isEditing, setIsEditing, updateReason.doc, updateReason.selection]);

  useEffect(() => {
    setHref(url);
  }, [url]);

  const submitHref = useCallback(() => {
    setIsEditing(false);
    const range = shortcut ?? undefined;

    if (href === '') {
      chain.removeLink();
    } else {
      chain.updateLink({ href, auto: false }, range);
    }

    chain.focus(range?.to ?? to).run();
  }, [setIsEditing, shortcut, chain, href, to]);

  const cancelHref = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const clickEdit = useCallback(() => {
    if (empty) {
      chain.selectLink();
    }

    setIsEditing(true);
  }, [chain, empty, setIsEditing]);

  return useMemo(
    () => ({ isEditing, href, setHref, shortcut, linkPositioner, onRemove, submitHref, cancelHref, clickEdit }),
    [isEditing, href, setHref, shortcut, linkPositioner, onRemove, submitHref, cancelHref, clickEdit]
  );
};

export default useFloatingLinkState;
