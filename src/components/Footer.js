import styled, { css } from "styled-components";

const media = {
  desktop: (...args) => css`
    @media (min-width: 870px) {
      ${css(...args)};
    }
  `
};

const FooterSection = styled.footer`
  margin-top: 4rem;
  font-family: nunito-sans, sans-serif;
  text-align: center;
  color: var(--textWhite2);
  ${media.desktop`
    text-align: left;
  `}
`;

const TopBar = styled.div`
  margin: auto;
  max-width: 1280px;
  padding: 40px 0;
  ${media.desktop`
    padding: 45px 80px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  `}
`;

const GetTheApp = styled.div`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.11;
  color: var(--textWhite1);
  margin: 0 -15px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  ${media.desktop`
    flex-wrap: nowrap;
    align-items: center;
    white-space: nowrap;
  `}
`;

const GetTheAppTitle = styled.div`
  margin-bottom: 4px;
  width: 100%;
  ${media.desktop`
    width: unset;
    margin: 0 15px;
  `}
`;

const AppStoreApp = styled.img`
  width: 189px;
  height: 63px;
  margin: 16px auto;
  padding: 0 20px;
  ${media.desktop`
    padding: 0;
    margin: 0 8px;
  `}
`;

const GoogleApp = styled.img`
  width: 189px;
  height: 63px;
  margin: 16px auto;
  padding: 0 20px;
  ${media.desktop`
    padding: 0;
    margin: 0 8px;
  `}
`;

const DesktopSocialList = styled.div`
  display: none;
  ${media.desktop`
    display: flex;
    align-items: center;
  `};
`;

const MobileSocialList = styled.div`
  padding-bottom: 40px;
  width: 100%;
  ${media.desktop`
    display: none;
  `};
`;

const Twitter = styled.svg`
  border: 1px lightgray solid;
  width: 33px;
  height: 33px;
  margin-left: 5px;
`;

const Facebook = styled.svg`
  border: 1px lightgray solid;
  width: 33px;
  height: 33px;
  margin-left: 5px;
`;

const Instagram = styled.svg`
  border: 1px lightgray solid;
  width: 33px;
  height: 33px;
  margin-left: 5px;
`;

const HR = styled.div`
  display: none;
  ${media.desktop`
    height: 0;
    padding: 0;
    margin: 0;
    display: block;
    border-bottom: 1px #cacada solid;
  `};
`;

const BottomBar = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  ${media.desktop`
    flex-wrap: nowrap;
    padding: 40px 80px 60px;
    justify-content: space-between;
  `};
`;

const Menu = styled.div`
  margin-bottom: 30px;
  min-width: 50%;
  ${media.desktop`
    min-width: unset;
    margin-bottom: 0;
    margin-right: 40px;
  `}
`;

const MenuHead = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.11;
  color: textWhite1;
`;

const MenuLink = styled.a`
  display: block;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  line-height: 2;
  color: #2f6cb3;
  ${media.desktop`
    white-space: nowrap;
  `}
`;

const Policy = styled.div`
  width: 100%;
  max-width: 764px;
  font-size: 12px;
  line-height: 1.33;
  margin: 0 20px;
`;

const PolicyRow = styled.p`
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
`;

const menu = [
  {
    name: "Program Guides",
    links: [
      { title: "Rough Around The Edges", url: "www.openfit.com" },
      { title: "Xtend Barre", url: "www.openfit.com" },
      { title: "600 Seconds", url: "www.openfit.com" },
      { title: "Yoga52", url: "www.openfit.com" }
    ]
  },
  {
    name: "About Us",
    links: [
      { title: "About Openfit", url: "www.openfit.com" },
      { title: "Help and Feedback", url: "www.openfit.com" },
      { title: "Terms and Condition", url: "www.openfit.com" },
      { title: "Privacy Policy", url: "www.openfit.com" },
      { title: "FAQ", url: "www.openfit.com" }
    ]
  }
];

const SocialList = () => (
  <>
    <Twitter />
    <Facebook />
    <Instagram />
  </>
);

export default function Footer() {
  return (
    <FooterSection>
      <TopBar>
        <GetTheApp>
          <GetTheAppTitle> Get The App</GetTheAppTitle>
          <AppStoreApp />
          <GoogleApp />
        </GetTheApp>
        <DesktopSocialList>
          <SocialList />
        </DesktopSocialList>
      </TopBar>
      <HR />
      <BottomBar>
        {menu.map(({ name, links }) => (
          <Menu key={name+links[0]}>
            <MenuHead>{name}</MenuHead>
            {links.map(({ title, url }) => (
              <MenuLink href={url} key={url+title}>{title}</MenuLink>
            ))}
          </Menu>
        ))}
        <MobileSocialList>
          <SocialList />
        </MobileSocialList>
        <Policy>
          <PolicyRow>© 2019 Openfit, LLC. All rights reserved.</PolicyRow>
          <PolicyRow>
            +Results vary depending on starting point and effort. Exercise and
            proper diet are necessary to achieve and maintain weight loss and
            muscle definition. The testimonials featured may have used more than
            one product or extended the program to achieve their maximum
            results.
          </PolicyRow>
          <PolicyRow>
            Consult your physician and follow all safety instructions before
            beginning any exercise program or using any supplement or meal
            replacement product, especially if you have any unique medical
            conditions or needs. The contents on our website are for
            informational purposes only, and are not intended to diagnose any
            medical condition, replace the advice of a healthcare professional,
            or provide any medical advice, diagnosis, or treatment.
          </PolicyRow>
          <PolicyRow>
            As an Amazon Associate, we may earn from qualifying purchases.
          </PolicyRow>
        </Policy>
      </BottomBar>
    </FooterSection>
  );
}
