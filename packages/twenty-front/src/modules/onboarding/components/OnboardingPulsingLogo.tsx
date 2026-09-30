import { COLOMBIA_TECH_BRAND_NAME } from '@/branding/constants/ColombiaTechBrand';
import { styled } from '@linaria/react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledTextMark = styled.span`
  animation: onboardingPulsingLogo 0.8s ease-in-out infinite alternate;
  color: ${themeCssVariables.font.color.primary};
  display: inline-block;
  font-family: ${themeCssVariables.font.family};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: ${themeCssVariables.spacing[8]};
  white-space: nowrap;

  @keyframes onboardingPulsingLogo {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.4;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

/**
 * Loader mark during workspace activation ("Rellenando tus datos…").
 * Matches welcome primary mark: ColombiaTech text (no Twenty "20").
 */
export const OnboardingPulsingLogo = () => (
  <StyledTextMark aria-hidden="true">{COLOMBIA_TECH_BRAND_NAME}</StyledTextMark>
);
