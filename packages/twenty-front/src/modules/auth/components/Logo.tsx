import { styled } from '@linaria/react';
import { isNonEmptyString } from '@sniptt/guards';
import { AppPath } from 'twenty-shared/types';
import { getImageAbsoluteURI, isDefined } from 'twenty-shared/utils';
import { Avatar } from 'twenty-ui/primitives/data-display';
import { UndecoratedLink } from 'twenty-ui/primitives/navigation';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { COLOMBIA_TECH_BRAND_NAME } from '@/branding/constants/ColombiaTechBrand';
import { REACT_APP_SERVER_BASE_URL } from '~/config';
import { useRedirectToDefaultDomain } from '~/modules/domain-manager/hooks/useRedirectToDefaultDomain';

type LogoProps = {
  primaryLogo?: string | null;
  secondaryLogo?: string | null;
  placeholder?: string | null;
  onClick?: () => void;
  to?: AppPath;
};

const StyledContainer = styled.div`
  height: ${themeCssVariables.spacing[12]};
  margin-bottom: ${themeCssVariables.spacing[4]};
  margin-top: ${themeCssVariables.spacing[4]};

  position: relative;
  width: ${themeCssVariables.spacing[12]};
`;

const StyledTextMarkContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${themeCssVariables.spacing[12]};
  justify-content: flex-start;
  margin-bottom: ${themeCssVariables.spacing[4]};
  margin-top: ${themeCssVariables.spacing[4]};
  min-width: ${themeCssVariables.spacing[12]};
  position: relative;
  width: auto;
`;

const StyledTextMark = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-family: ${themeCssVariables.font.family};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  letter-spacing: -0.02em;
  line-height: 1.2;
  padding-right: ${themeCssVariables.spacing[4]};
  white-space: nowrap;
`;

const StyledSecondaryLogo = styled.img`
  border-radius: ${themeCssVariables.border.radius.xs};
  height: ${themeCssVariables.spacing[6]};
  width: ${themeCssVariables.spacing[6]};
`;

const StyledSecondaryLogoContainer = styled.div`
  align-items: center;
  background-color: ${themeCssVariables.background.primary};
  border-radius: ${themeCssVariables.border.radius.sm};
  bottom: calc(-1 * ${themeCssVariables.spacing[3]});
  display: flex;
  height: ${themeCssVariables.spacing[7]};
  justify-content: center;

  position: absolute;
  right: calc(-1 * ${themeCssVariables.spacing[3]});
  width: ${themeCssVariables.spacing[7]};
`;

const StyledPrimaryLogo = styled.div`
  background-size: cover;
  height: 100%;
  width: 100%;
`;

export const Logo = ({
  primaryLogo,
  secondaryLogo,
  placeholder,
  onClick,
  to = AppPath.SignInUp,
}: LogoProps) => {
  const { redirectToDefaultDomain } = useRedirectToDefaultDomain();

  const primaryLogoUrl = isDefined(primaryLogo)
    ? getImageAbsoluteURI({
        imageUrl: primaryLogo,
        baseUrl: REACT_APP_SERVER_BASE_URL,
      })
    : null;

  const secondaryLogoUrl = isNonEmptyString(secondaryLogo)
    ? getImageAbsoluteURI({
        imageUrl: secondaryLogo,
        baseUrl: REACT_APP_SERVER_BASE_URL,
      })
    : null;

  const secondaryBadge = isDefined(secondaryLogoUrl) ? (
    <StyledSecondaryLogoContainer>
      <StyledSecondaryLogo src={secondaryLogoUrl} />
    </StyledSecondaryLogoContainer>
  ) : (
    isDefined(placeholder) && (
      <StyledSecondaryLogoContainer>
        <Avatar
          size="lg"
          name={placeholder}
          shape="square"
          colorSeed={placeholder}
        />
      </StyledSecondaryLogoContainer>
    )
  );

  if (!isDefined(primaryLogoUrl)) {
    return (
      <StyledTextMarkContainer onClick={() => onClick?.()}>
        <UndecoratedLink to={to} onClick={() => redirectToDefaultDomain()}>
          <StyledTextMark>{COLOMBIA_TECH_BRAND_NAME}</StyledTextMark>
        </UndecoratedLink>
        {secondaryBadge}
      </StyledTextMarkContainer>
    );
  }

  return (
    <StyledContainer onClick={() => onClick?.()}>
      <StyledPrimaryLogo
        style={{ backgroundImage: `url(${primaryLogoUrl})` }}
      />
      {secondaryBadge}
    </StyledContainer>
  );
};
