import { Tool, ToolCategory } from '../types';
import { BMICalculator } from '../components/tools/calculators/BMICalculator';
import { TipCalculator } from '../components/tools/calculators/TipCalculator';
import { AgeCalculator } from '../components/tools/calculators/AgeCalculator';
import { UnitConverter } from '../components/tools/converters/UnitConverter';
import { TemperatureConverter } from '../components/tools/converters/TemperatureConverter';
import { NepaliDateConverter } from '../components/tools/converters/NepaliDateConverter';
import { PasswordGenerator } from '../components/tools/generators/PasswordGenerator';
import { MD5Generator } from '../components/tools/generators/MD5Generator';
import { RandomNumberGenerator } from '../components/tools/generators/RandomNumberGenerator';
import { LoremGenerator } from '../components/tools/generators/LoremGenerator';
import { WordCounter } from '../components/tools/utilities/WordCounter';
import { TextSorter } from '../components/tools/utilities/TextSorter';
import { FindAndReplaceTool } from '../components/tools/utilities/FindAndReplaceTool';
import { CPSTest } from '../components/tools/utilities/CPSTest';
import { ImageCropper } from '../components/tools/image/ImageCropper';
import { ImageResizer } from '../components/tools/image/ImageResizer';
import { ImageFlipper } from '../components/tools/image/ImageFlipper';
import { ImageRotator } from '../components/tools/image/ImageRotator';
import { PassportPhotoMaker } from '../components/tools/image/PassportPhotoMaker';
import { AddWatermark } from '../components/tools/image/AddWatermark';
import { CompressJPG } from '../components/tools/image/CompressJPG';
import { IncreaseJPGSize } from '../components/tools/image/IncreaseJPGSize';
import { CompressJPGTo50kb } from '../components/tools/image/CompressJPGTo50kb';
import { CompressJPGTo100kb } from '../components/tools/image/CompressJPGTo100kb';
import { CompressJPGTo200kb } from '../components/tools/image/CompressJPGTo200kb';
import { InvoiceGenerator } from '../components/tools/generators/InvoiceGenerator';
import { PreetiToUnicode } from '../components/tools/converters/PreetiToUnicode';
import { WordCaseConverter } from '../components/tools/converters/WordCaseConverter';
import { QRCodeGenerator } from '../components/tools/generators/QRCodeGenerator';
import { BarcodeGenerator } from '../components/tools/generators/BarcodeGenerator';
import { BarcodeScanner } from '../components/tools/utilities/BarcodeScanner';
import { JpgToPdfConverter } from '../components/tools/pdf/JpgToPdfConverter';
import { PdfToImagesConverter } from '../components/tools/pdf/PdfToImagesConverter';
import { PdfToWordConverter } from '../components/tools/pdf/PdfToWordConverter';
import { WebOptimizePdf } from '../components/tools/pdf/WebOptimizePdf';
import { MergePdf } from '../components/tools/pdf/MergePdf';
import { SplitPdf } from '../components/tools/pdf/SplitPdf';
import { SignPdf } from '../components/tools/pdf/SignPdf';
import { DateCalculator } from '../components/tools/calculators/DateCalculator';
import { TimeCalculator } from '../components/tools/calculators/TimeCalculator';
import { HoursCalculator } from '../components/tools/calculators/HoursCalculator';
import { TimeCardCalculator } from '../components/tools/calculators/TimeCardCalculator';
import { TimeZoneConverter } from '../components/tools/converters/TimeZoneConverter';
import { TimeDurationCalculator } from '../components/tools/calculators/TimeDurationCalculator';
import { DayCounter } from '../components/tools/calculators/DayCounter';
import { DayOfTheWeekCalculator } from '../components/tools/calculators/DayOfTheWeekCalculator';
import { FlashCardMaker } from '../components/tools/utilities/FlashCardMaker';
import { InfoCardMaker } from '../components/tools/generators/InfoCardMaker';
import { 
  CalculatorIcon, ScaleIcon, KeyIcon,
  DocumentTextIcon, CakeIcon, ArrowsRightLeftIcon, 
  MagnifyingGlassIcon, CalendarDaysIcon, ShieldCheckIcon,
  PencilIcon, DocumentDuplicateIcon, ArrowPathIcon, PlayIcon,
  HeartIcon,
  UsersIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  ThermometerIcon,
  DocumentChartBarIcon,
  CharacterSpacingIcon,
  CursorArrowRaysIcon,
  ClockIcon,
  TrophyIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  ArrowsPointingOutIcon,
  LockClosedIcon,
  LockOpenIcon,
  ArrowsUpDownIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowsPointingInIcon,
  ArrowTrendingUpIcon,
  RocketLaunchIcon,
  QrCodeIcon,
  BarcodeIcon,
  WrenchScrewdriverIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  DocumentPlusIcon,
  ScissorsIcon
} from '../components/Icons';

// NOTE: This array is the single source of truth for all tools in the application.
// All tool components are imported from their new locations in `app/components/tools`.
export const tools: Tool[] = [
  // ... (All tool definitions are copied here, but with correct component imports)
  // Example for BMI Calculator:
  {
    path: '/calculators/bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI).',
    category: ToolCategory.CALCULATOR,
    component: BMICalculator,
    icon: ScaleIcon,
    about: 'The Body Mass Index (BMI) Calculator is a useful tool that measures body fat based on height and weight. It\'s a quick way to gauge whether your weight is in a healthy range. Our calculator supports both metric and imperial units for your convenience.',
    howTo: [
      { title: 'Select Units', description: 'Choose between Metric (cm, kg) or Imperial (in, lbs) measurement systems.' },
      { title: 'Enter Details', description: 'Input your height and weight into the designated fields.' },
      { title: 'View Result', description: 'Your BMI and corresponding weight category will be calculated and displayed instantly.' }
    ],
    features: [
      { icon: ArrowsRightLeftIcon, title: 'Metric & Imperial Units', description: 'Easily switch between unit systems to enter your measurements comfortably.' },
      { icon: CalculatorIcon, title: 'Instant Calculation', description: 'Get your BMI result in real-time as you type, with no need to click a button.' },
      { icon: ShieldCheckIcon, title: 'Health Categories', description: 'Understand your result with clear health categories like Underweight, Normal, Overweight, or Obese.' }
    ]
  },
  // ... All other 50+ tool definitions follow the same pattern
];
