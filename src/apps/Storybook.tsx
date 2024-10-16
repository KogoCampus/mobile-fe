// import { AlertProvider } from "@components/ui/Alert/AlertContext";
import SbView from '../../.storybook';
import ThemeFontProvider from './providers/ThemeFontProvider';

// function AppEntry(): JSX.Element | null { // Alert 고치기 전까지 임시
//   return (
//     <ThemeFontProvider>
//       <AlertProvider>
//         <SbView />
//       </AlertProvider>
//     </ThemeFontProvider>
//   );
// }

function AppEntry(): JSX.Element | null {
    return (
        <ThemeFontProvider>
            <SbView />
        </ThemeFontProvider>
    );
}

export default AppEntry;
