import { parse, serialize } from 'cookie';
import { getStyleSettings } from '../src/lib/helpers'; 
import { defaultThemeConfig } from '../src/configs/theme.config'; // Import defaultThemeConfig if needed
import { RootLayout } from '_layout';
export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = parse(req.headers.cookie || '');
  let theme = cookies.userTheme;

  if (!theme) {
    try {
      const styleSettings = await getStyleSettings();
      theme = JSON.stringify(styleSettings);
      res.setHeader('Set-Cookie', serialize('userTheme', theme, { httpOnly: false, path: '/' }));
    } catch (error) {
      console.error('Failed to fetch style settings:', error);
      theme = JSON.stringify(defaultThemeConfig);
      res.setHeader('Set-Cookie', serialize('userTheme', theme, { httpOnly: false, path: '/' }));
    }
  }

  return {
    props: {}, // Add necessary props if needed
  };
}

const HomePage = () => {
  return (
    <RootLayout>
      {/* Your page content goes here */}
    </RootLayout>
  );
};

export default HomePage;
