// @ts-expect-error external library has a typing issue
import { RevertConnect } from '@revertdotdev/revert-react';

import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsReadDocumentationButton } from '@/settings/developers/components/SettingsReadDocumentationButton';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { Trans, useLingui } from '@lingui/react/macro';
import { useRecoilValue } from 'recoil';
import { Section } from 'twenty-ui';

const REVERT_PUBLIC_KEY = 'pk_live_a87fee8c-28c7-494f-99a3-996ff89f9918';

export const SettingsCRMMigration = () => {
  const { t } = useLingui();
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  return (
    <SubMenuTopBarContainer
      title={t`Migrate`}
      links={[
        {
          children: <Trans>Workspace</Trans>,
          href: getSettingsPagePath(SettingsPath.Workspace),
        },
        { children: <Trans>Migrate</Trans> },
      ]}
      actionButton={<SettingsReadDocumentationButton />}
    >
      <SettingsPageContainer>
        <SettingsHeaderContainer></SettingsHeaderContainer>
        <Section>
          <RevertConnect
            config={{
              revertToken: REVERT_PUBLIC_KEY,
              tenantId: currentWorkspace?.id,
            }}
          />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
