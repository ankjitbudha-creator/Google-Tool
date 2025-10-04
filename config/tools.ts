import { Tool, ToolCategory } from '../types';
import { BMICalculator } from '../pages/calculators/BMICalculator';
import { TipCalculator } from '../pages/calculators/TipCalculator';
import { AgeCalculator } from '../pages/calculators/AgeCalculator';
import { UnitConverter } from '../pages/converters/UnitConverter';
import { TemperatureConverter } from '../pages/converters/TemperatureConverter';
import { NepaliDateConverter } from '../pages/converters/NepaliDateConverter';
import { PasswordGenerator } from '../pages/generators/PasswordGenerator';
import { MD5Generator } from '../pages/generators/MD5Generator';
import { RandomNumberGenerator } from '../pages/generators/RandomNumberGenerator';
import { LoremGenerator } from '../pages/generators/LoremGenerator';
import { WordCounter } from '../pages/utilities/WordCounter';
import { TextSorter } from '../pages/utilities/TextSorter';
import { FindAndReplaceTool } from '../pages/utilities/FindAndReplaceTool';
import { CPSTest } from '../pages/utilities/CPSTest';
import { ImageCropper } from '../pages/image/ImageCropper';
import { ImageResizer } from '../pages/image/ImageResizer';
import { ImageFlipper } from '../pages/image/ImageFlipper';
import { ImageRotator } from '../pages/image/ImageRotator';
import { PassportPhotoMaker } from '../pages/image/PassportPhotoMaker';
import { AddWatermark } from '../pages/image/AddWatermark';
import { CompressJPG } from '../pages/image/CompressJPG';
import { IncreaseJPGSize } from '../pages/image/IncreaseJPGSize';
import { CompressJPGTo50kb } from '../pages/image/CompressJPGTo50kb';
import { CompressJPGTo100kb } from '../pages/image/CompressJPGTo100kb';
import { CompressJPGTo200kb } from '../pages/image/CompressJPGTo200kb';
import { InvoiceGenerator } from '../pages/generators/InvoiceGenerator';
import { PreetiToUnicode } from '../pages/converters/PreetiToUnicode';
import { WordCaseConverter } from '../pages/converters/WordCaseConverter';
import { QRCodeGenerator } from '../pages/generators/QRCodeGenerator';
import { BarcodeGenerator } from '../pages/generators/BarcodeGenerator';
import { BarcodeScanner } from '../pages/utilities/BarcodeScanner';
import { JpgToPdfConverter } from '../pages/pdf/JpgToPdfConverter';
import { PdfToImagesConverter } from '../pages/pdf/PdfToImagesConverter';
import { PdfToWordConverter } from '../pages/pdf/PdfToWordConverter';
import { WebOptimizePdf } from '../pages/pdf/WebOptimizePdf';
import { MergePdf } from '../pages/pdf/MergePdf';
import { SplitPdf } from '../pages/pdf/SplitPdf';
import { SignPdf } from '../pages/pdf/SignPdf';
import { DateCalculator } from '../pages/calculators/DateCalculator';
import { TimeCalculator } from '../pages/calculators/TimeCalculator';
import { HoursCalculator } from '../pages/calculators/HoursCalculator';
import { TimeCardCalculator } from '../pages/calculators/TimeCardCalculator';
import { TimeZoneConverter } from '../pages/converters/TimeZoneConverter';
import { TimeDurationCalculator } from '../pages/calculators/TimeDurationCalculator';
import { DayCounter } from '../pages/calculators/DayCounter';
import { DayOfTheWeekCalculator } from '../pages/calculators/DayOfTheWeekCalculator';
import { FlashCardMaker } from '../pages/utilities/FlashCardMaker';
import { InfoCardMaker } from '../pages/generators/InfoCardMaker';
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

export const tools: Tool[] = [
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
  {
    path: '/calculators/tip',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills easily.',
    category: ToolCategory.CALCULATOR,
    component: TipCalculator,
    icon: CurrencyDollarIcon,
    about: 'Our Tip Calculator makes it easy to figure out the right tip amount and see the total bill. You can also split the total cost among multiple people, making it perfect for group outings. Customize the tip percentage or use our handy presets.',
    howTo: [
        { title: 'Enter Bill Amount', description: 'Input the total amount of your bill before the tip.' },
        { title: 'Set Tip Percentage', description: 'Choose a preset tip amount or enter a custom percentage.' },
        { title: 'Add Number of People', description: 'Specify how many people are splitting the bill to see the per-person total.' }
    ],
    features: [
        { icon: CalculatorIcon, title: 'Real-Time Calculation', description: 'All values update instantly as you input the numbers, giving you immediate results.' },
        { icon: HeartIcon, title: 'Tip Presets', description: 'Use common tip percentages like 15%, 18%, or 20% with a single click for fast calculations.' },
        { icon: UsersIcon, title: 'Bill Splitting', description: 'Effortlessly divide the total amount, including the tip, among any number of people.' }
    ]
  },
  {
    path: '/calculators/age',
    name: 'Age Calculator',
    description: 'Calculate your age from your date of birth.',
    category: ToolCategory.CALCULATOR,
    component: AgeCalculator,
    icon: CakeIcon,
    about: 'The Age Calculator determines your age down to the exact day. It also provides interesting statistics like the total number of months, weeks, and days you\'ve lived. It\'s a fun and easy way to see a detailed breakdown of your age.',
    howTo: [
        { title: 'Enter Your Birth Date', description: 'Input the day, month, and year you were born.' },
        { title: 'View Your Age', description: 'The calculator will instantly show your age in years, months, and days.' },
        { title: 'See Total Time Lived', description: 'Discover the total number of months, weeks, and days you have been alive.' }
    ],
    features: [
        { icon: CakeIcon, title: 'Precise Age Breakdown', description: 'Calculates your age precisely in years, months, and days for an accurate result.' },
        { icon: CalendarDaysIcon, title: 'Total Lived Statistics', description: 'Provides additional fun facts, including your age in total months, weeks, and days.' },
        { icon: ShieldCheckIcon, title: 'Date Validation', description: 'Includes smart validation to ensure you enter a valid and logical date of birth.' }
    ]
  },
  {
    path: '/calculators/date-calculator',
    name: 'Date Calculator',
    description: 'Add or subtract days, weeks, months, or years from a date.',
    category: ToolCategory.CALCULATOR,
    component: DateCalculator,
    icon: CalendarDaysIcon,
    about: 'The Date Calculator allows you to add or subtract time from a specific date, making it easy to calculate future or past dates. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Select a start date.' },
      { title: 'Coming Soon', description: 'Choose to add or subtract time.' },
      { title: 'Coming Soon', description: 'Enter the amount of days, weeks, months, or years.' },
      { title: 'Coming Soon', description: 'View the resulting date.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you a high-quality, client-side Date Calculator tool.' },
    ]
  },
  {
    path: '/calculators/time-calculator',
    name: 'Time Calculator',
    description: 'Add or subtract time units (hours, minutes, seconds).',
    category: ToolCategory.CALCULATOR,
    component: TimeCalculator,
    icon: ClockIcon,
    about: 'The Time Calculator lets you perform arithmetic operations on time values. You can add or subtract hours, minutes, and seconds. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Enter a starting time.' },
      { title: 'Coming Soon', description: 'Choose to add or subtract.' },
      { title: 'Coming Soon', description: 'Enter the time value to calculate.' },
      { title: 'Coming Soon', description: 'See the resulting time.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you a high-quality, client-side Time Calculator tool.' },
    ]
  },
  {
    path: '/calculators/hours-calculator',
    name: 'Hours Calculator',
    description: 'Calculate the total hours between two times.',
    category: ToolCategory.CALCULATOR,
    component: HoursCalculator,
    icon: ClockIcon,
    about: 'The Hours Calculator determines the total number of hours and minutes between two specified times, which can span across different days. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Enter a start time and date.' },
      { title: 'Coming Soon', description: 'Enter an end time and date.' },
      { title: 'Coming Soon', description: 'View the total hours and minutes calculated.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you this tool.' },
    ]
  },
  {
    path: '/calculators/time-card-calculator',
    name: 'Time Card Calculator',
    description: 'Calculate weekly hours and pay for a time card.',
    category: ToolCategory.CALCULATOR,
    component: TimeCardCalculator,
    icon: CurrencyDollarIcon,
    about: 'The Time Card Calculator helps you compute your weekly work hours and gross pay based on start and end times for each day, including breaks. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Enter your hourly wage.' },
      { title: 'Coming Soon', description: 'Fill in your start time, end time, and break duration for each day.' },
      { title: 'Coming Soon', description: 'View the total hours worked and your gross pay.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you this tool.' },
    ]
  },
  {
    path: '/calculators/time-duration-calculator',
    name: 'Time Duration Calculator',
    description: 'Calculate the duration between two dates and times.',
    category: ToolCategory.CALCULATOR,
    component: TimeDurationCalculator,
    icon: ClockIcon,
    about: 'Calculate the total time duration between a start date/time and an end date/time, broken down into years, months, days, hours, minutes, and seconds. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Enter the start date and time.' },
      { title: 'Coming Soon', description: 'Enter the end date and time.' },
      { title: 'Coming Soon', description: 'View the detailed time duration.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you this tool.' },
    ]
  },
  {
    path: '/calculators/day-counter',
    name: 'Day Counter',
    description: 'Count the number of days between two dates.',
    category: ToolCategory.CALCULATOR,
    component: DayCounter,
    icon: CalendarDaysIcon,
    about: 'The Day Counter calculates the exact number of days between two given dates. You can also choose to include or exclude the end day. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Select a start date.' },
      { title: 'Coming Soon', description: 'Select an end date.' },
      { title: 'Coming Soon', description: 'View the total number of days between the dates.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you this tool.' },
    ]
  },
  {
    path: '/calculators/day-of-the-week-calculator',
    name: 'Day of the Week Calculator',
    description: 'Find the day of the week for any given date.',
    category: ToolCategory.CALCULATOR,
    component: DayOfTheWeekCalculator,
    icon: CalendarDaysIcon,
    about: 'Quickly find out the day of the week (Monday, Tuesday, etc.) for any date in the past, present, or future. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Enter any date (day, month, year).' },
      { title: 'Coming Soon', description: 'View the corresponding day of the week.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you this tool.' },
    ]
  },
  {
    path: '/converters/unit',
    name: 'Unit Converter',
    description: 'Convert various units of measurement.',
    category: ToolCategory.CONVERTER,
    component: UnitConverter,
    icon: ArrowsRightLeftIcon,
    about: 'Our comprehensive Unit Converter tool supports a wide range of categories including length, weight, volume, and area. It allows for quick and accurate conversions between different metric and imperial units, making it an essential tool for students, professionals, and anyone in need of quick calculations.',
    howTo: [
        { title: 'Select Category', description: 'Choose the type of measurement you want to convert, such as Length or Weight.' },
        { title: 'Input Value', description: 'Enter the value you wish to convert and select its unit.' },
        { title: 'Get Result', description: 'Select the unit you want to convert to and see the result instantly.' }
    ],
    features: [
        { icon: DocumentTextIcon, title: 'Multiple Categories', description: 'Supports conversions for length, weight, volume, area, and more.' },
        { icon: ArrowsRightLeftIcon, title: 'Swap Units', description: 'Instantly swap the "from" and "to" units with a single click for reverse conversions.' },
        { icon: CalculatorIcon, title: 'Real-Time Conversion', description: 'The converted value updates automatically as you type, providing immediate answers.' }
    ]
  },
  {
    path: '/converters/temperature',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    category: ToolCategory.CONVERTER,
    component: TemperatureConverter,
    icon: ThermometerIcon,
    about: 'The Temperature Converter provides a simple and fast way to switch between the three most common temperature scales: Celsius, Fahrenheit, and Kelvin. The interface is synchronized, meaning an update to any one of the fields will instantly update the other two, providing a seamless conversion experience.',
    howTo: [
        { title: 'Enter Temperature', description: 'Type a value into any of the three fields: Celsius, Fahrenheit, or Kelvin.' },
        { title: 'View Conversions', description: 'As you type, the other two fields will automatically update with the converted values.' }
    ],
    features: [
        { icon: CalculatorIcon, title: 'Three-Way Conversion', description: 'Simultaneously see the equivalent temperature in Celsius, Fahrenheit, and Kelvin.' },
        { icon: ArrowsRightLeftIcon, title: 'Synchronized Inputs', description: 'All fields are linked, so changing one value instantly updates the others.' },
        { icon: PencilIcon, title: 'Simple & Clean Interface', description: 'A straightforward and uncluttered design makes converting temperatures quick and easy.' }
    ]
  },
   {
    path: '/converters/nepali-date-converter',
    name: 'Nepali Date Converter',
    description: 'Convert dates between Nepali and English calendars.',
    category: ToolCategory.CONVERTER,
    component: NepaliDateConverter,
    icon: CalendarDaysIcon,
    about: 'Our super easy and fast Nepali Date Converter helps you convert dates between the Nepali Bikram Sambat (B.S.) calendar and the Gregorian (A.D.) calendar. This tool is a must-have for anyone who needs to navigate between the two systems, saving you from the hassle and confusion of manual conversion.',
    howTo: [
      { title: 'Select Conversion Type', description: 'Choose whether you want to convert from Bikram Sambat (B.S.) to Gregorian or vice versa.' },
      { title: 'Enter Date', description: 'Use the dropdowns to enter the date you want to convert.' },
      { title: 'Click Convert', description: 'Click the convert button to get the accurate converted date.' }
    ],
    features: [
      { icon: UsersIcon, title: 'For Everyone', description: 'Essential for students, professionals, and event planners working with both Nepali and international dates.' },
      { icon: ArrowsRightLeftIcon, title: 'Two-Way Conversion', description: 'Easily convert dates from Bikram Sambat (BS) to Gregorian (AD) and vice versa with precision.' },
      { icon: CalendarDaysIcon, title: 'Accurate & Reliable', description: 'Avoids the confusion and time-consuming nature of manual date conversion between the two calendar systems.' }
    ]
  },
  {
    path: '/converters/time-zone-converter',
    name: 'Time Zone Converter',
    description: 'Convert times between different time zones.',
    category: ToolCategory.CONVERTER,
    component: TimeZoneConverter,
    icon: ArrowsRightLeftIcon,
    about: 'The Time Zone Converter allows you to find the corresponding time in different cities and time zones around the world. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Select a date and time in your local time zone.' },
      { title: 'Coming Soon', description: 'Add one or more other time zones.' },
      { title: 'Coming Soon', description: 'View the converted times instantly.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you this tool.' },
    ]
  },
  {
    path: '/generators/password',
    name: 'Password Generator',
    description: 'Generate strong and secure random passwords.',
    category: ToolCategory.GENERATOR,
    component: PasswordGenerator,
    icon: KeyIcon,
    about: 'Generate strong, random passwords to protect your online accounts. Our Password Generator allows you to customize password length and character types, including uppercase letters, lowercase letters, numbers, and symbols. A strength indicator helps you create a password that is difficult to crack.',
    howTo: [
        { title: 'Set Options', description: 'Adjust the password length and choose which character types to include (e.g., uppercase, numbers).' },
        { title: 'Generate Password', description: 'Click the "Generate" button to create a new, random password based on your criteria.' },
        { title: 'Copy and Use', description: 'Easily copy the generated password to your clipboard with a single click.' }
    ],
    features: [
        { icon: KeyIcon, title: 'Customizable Options', description: 'Control the length and character set of your password for any security requirement.' },
        { icon: ShieldCheckIcon, title: 'Strength Indicator', description: 'Visually assess the strength of your password to ensure it is secure enough.' },
        { icon: DocumentDuplicateIcon, title: 'One-Click Copy', description: 'Quickly copy the generated password to your clipboard, making it easy to use immediately.' }
    ]
  },
  {
    path: '/generators/infocard-maker',
    name: 'InfoCard Maker',
    description: 'Create modern, professional information cards for social profiles or business contacts.',
    category: ToolCategory.GENERATOR,
    component: InfoCardMaker,
    icon: IdentificationIcon,
    about: 'Design and generate beautiful, personalized info cards. Perfect for social media bios, contact information, or digital business cards. Customize colors, fonts, and social links to create a card that truly represents you.',
    howTo: [
      { title: 'Upload Your Photo', description: 'Start by uploading a profile picture for your card.' },
      { title: 'Fill in Details', description: 'Add your name, title, bio, and social media links.' },
      { title: 'Customize Style', description: 'Choose your preferred colors and font to match your personal brand.' },
      { title: 'Download Card', description: 'Click the download button to save your custom info card as a high-quality PNG image.' }
    ],
    features: [
      { icon: PencilIcon, title: 'Full Customization', description: 'Control every aspect of your card, from colors and fonts to social links and bio.' },
      { icon: PhotoIcon, title: 'Live Preview', description: 'See your changes in real-time as you design your perfect info card.' },
      { icon: UsersIcon, title: 'Social Integration', description: 'Easily add links to your website, GitHub, Twitter (X), and LinkedIn profiles with icons.' },
      { icon: DocumentDuplicateIcon, title: 'High-Quality PNG', description: 'Download your final creation as a high-resolution PNG, ready for use anywhere.' }
    ]
  },
  {
    path: '/generators/md5-generator',
    name: 'MD5 Generator',
    description: 'Generate the MD5 hash of any text.',
    category: ToolCategory.GENERATOR,
    component: MD5Generator,
    icon: ShieldCheckIcon,
    about: 'The MD5 Generator computes a 128-bit hash value from any string of text. This tool is useful for verifying data integrity and for cryptographic purposes. The hash is generated in real-time in your browser as you type.',
    howTo: [
      { title: 'Enter Text', description: 'Type or paste the text you want to hash into the input field.' },
      { title: 'View Hash', description: 'The 32-character hexadecimal MD5 hash will appear in the output field instantly.' },
      { title: 'Copy Hash', description: 'Click the copy button to easily copy the generated hash to your clipboard.' }
    ],
    features: [
      { icon: RocketLaunchIcon, title: 'Real-Time Hashing', description: 'The MD5 hash is calculated and updated instantly as you type.' },
      { icon: ShieldCheckIcon, title: 'Client-Side Security', description: 'All calculations are performed locally in your browser, ensuring your data remains private.' },
      { icon: DocumentDuplicateIcon, title: 'One-Click Copy', description: 'Conveniently copy the generated hash to your clipboard with a single click.' }
    ]
  },
  {
    path: '/generators/random-number-generator',
    name: 'Random Number Generator',
    description: 'Generate random numbers with custom settings.',
    category: ToolCategory.GENERATOR,
    component: RandomNumberGenerator,
    icon: CalculatorIcon,
    about: 'A versatile tool for generating random numbers. You can specify a range (minimum and maximum), define how many numbers to generate, and choose whether to allow duplicates. Perfect for games, statistical sampling, or any situation where you need random numbers.',
    howTo: [
      { title: 'Set Range', description: 'Enter the minimum and maximum values for your desired number range.' },
      { title: 'Define Quantity', description: 'Specify how many random numbers you want to generate.' },
      { title: 'Choose Options', description: 'Decide if you want to allow duplicate numbers in the results.' },
      { title: 'Generate & Copy', description: 'Click "Generate" to see the results, then copy them with a single click.' }
    ],
    features: [
      { icon: PencilIcon, title: 'Customizable Range', description: 'Generate numbers within any specific range by setting a minimum and maximum.' },
      { icon: ArrowsRightLeftIcon, title: 'Control Duplicates', description: 'Choose whether the generated set of numbers can contain duplicates or must be unique.' },
      { icon: DocumentTextIcon, title: 'Bulk Generation', description: 'Generate multiple random numbers at once to suit your needs.' }
    ]
  },
  {
    path: '/generators/lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs.',
    category: ToolCategory.GENERATOR,
    component: LoremGenerator,
    icon: DocumentTextIcon,
    about: 'Quickly generate "Lorem Ipsum" placeholder text for your mockups, designs, or documents. This tool allows you to create a specific number of paragraphs, sentences, or words, giving you the exact amount of text you need.',
    howTo: [
      { title: 'Select Type', description: 'Choose whether you want to generate paragraphs, sentences, or words.' },
      { title: 'Enter Amount', description: 'Specify the number of paragraphs, sentences, or words you need.' },
      { title: 'Generate Text', description: 'Click the "Generate" button to create the placeholder text.' },
      { title: 'Copy Text', description: 'Use the copy button to easily transfer the generated text to your clipboard.' }
    ],
    features: [
      { icon: PencilIcon, title: 'Flexible Generation', description: 'Generate text by the number of paragraphs, sentences, or words.' },
      { icon: RocketLaunchIcon, title: 'Instant & Fast', description: 'Create large blocks of placeholder text instantly with a single click.' },
      { icon: DocumentDuplicateIcon, title: 'Easy to Use', description: 'A simple interface and one-click copy make it perfect for designers and developers.' }
    ]
  },
  {
    path: '/generators/qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, and more.',
    category: ToolCategory.GENERATOR,
    component: QRCodeGenerator,
    icon: QrCodeIcon,
    about: 'Our QR Code Generator makes it easy to create high-quality QR codes for websites, contact information, Wi-Fi access, and more. Customize the colors and download your QR code as a PNG file, ready to be used anywhere.',
    howTo: [
        { title: 'Enter Data', description: 'Type or paste the URL, text, or other information you want to encode into the QR code.' },
        { title: 'Customize (Optional)', description: 'Change the foreground and background colors to match your branding.' },
        { title: 'Download', description: 'Click the "Download QR Code" button to save the generated image to your device.' }
    ],
    features: [
        { icon: PencilIcon, title: 'Color Customization', description: 'Personalize your QR code with custom colors for both the foreground and background.' },
        { icon: ShieldCheckIcon, title: 'Error Correction', description: 'Choose from different error correction levels to ensure your QR code remains scannable even if partially damaged.' },
        { icon: DocumentDuplicateIcon, title: 'High-Quality PNG', description: 'Download your QR code as a high-resolution PNG file suitable for both digital and print use.' }
    ]
  },
  {
    path: '/generators/barcode-generator',
    name: 'Barcode Generator',
    description: 'Generate various types of barcodes like CODE128, EAN, and UPC.',
    category: ToolCategory.GENERATOR,
    component: BarcodeGenerator,
    icon: BarcodeIcon,
    about: 'Create standard-compliant barcodes for inventory, retail, and logistics. Our tool supports a wide variety of formats, including CODE128, EAN-13, and UPC. You can customize the appearance and download a high-quality image of your barcode.',
    howTo: [
        { title: 'Enter Value', description: 'Input the data you want to encode into the barcode.' },
        { title: 'Select Format', description: 'Choose the correct barcode symbology from the dropdown list (e.g., CODE128).' },
        { title: 'Customize & Download', description: 'Adjust colors and dimensions as needed, then click "Download Barcode" to save it.' }
    ],
    features: [
        { icon: DocumentTextIcon, title: 'Multiple Formats', description: 'Supports a wide range of popular barcode formats, including CODE128, EAN, UPC, and more.' },
        { icon: PencilIcon, title: 'Full Customization', description: 'Control the barcode\'s width, height, and colors to fit your specific needs.' },
        { icon: ShieldCheckIcon, title: 'Validation', description: 'The tool provides real-time feedback if the entered data is invalid for the selected barcode format.' }
    ]
  },
  {
    path: '/utilities/word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and paragraphs in text.',
    category: ToolCategory.UTILITY,
    component: WordCounter,
    icon: DocumentTextIcon,
    about: 'The Word Counter tool provides a real-time analysis of your text. Simply paste or start typing, and you\'ll see an instant count of words, characters (with and without spaces), and paragraphs. It\'s an essential tool for writers, students, and professionals who need to meet specific length requirements.',
    howTo: [
        { title: 'Enter Text', description: 'Paste your text into the text area, or start typing directly.' },
        { title: 'View Statistics', description: 'The counts for words, characters, and paragraphs will update in real time as you type.' }
    ],
    features: [
        { icon: CalculatorIcon, title: 'Real-Time Statistics', description: 'Get instant updates on word, character, and paragraph counts as you edit your text.' },
        { icon: DocumentTextIcon, title: 'Comprehensive Analysis', description: 'Tracks multiple metrics including characters with and without spaces for detailed analysis.' },
        { icon: PencilIcon, title: 'Simple Interface', description: 'A clean and intuitive interface allows you to focus on your writing without distractions.' }
    ]
  },
  {
    path: '/utilities/text-sorter',
    name: 'Text Sorter',
    description: 'Sort lines or words of text alphabetically, in reverse, or randomly.',
    category: ToolCategory.UTILITY,
    component: TextSorter,
    icon: ArrowsUpDownIcon,
    about: 'The Text Sorter is a handy utility for organizing your text-based data. You can sort lists, paragraphs, or any text by lines or by individual words. It supports alphabetical (A-Z), reverse alphabetical (Z-A), reverse order, and random shuffling. A case-sensitive option provides more granular control over your sorting.',
    howTo: [
        { title: 'Paste Your Text', description: 'Enter or paste the text you want to sort into the input box.' },
        { title: 'Choose Options', description: 'Select whether to sort by lines or words, and if the sort should be case-sensitive.' },
        { title: 'Apply Sorting', description: 'Click one of the sorting buttons (e.g., "Sort A-Z", "Reverse") to process your text.' },
        { title: 'Copy Result', description: 'Your sorted text will appear in the output box, ready to be copied.' }
    ],
    features: [
        { icon: ArrowsUpDownIcon, title: 'Multiple Sort Modes', description: 'Sort alphabetically, reverse alphabetically, reverse the order, or shuffle randomly.' },
        { icon: CharacterSpacingIcon, title: 'Sort by Lines or Words', description: 'Flexibly organize your text either line by line or word by word.' },
        { icon: PencilIcon, title: 'Case-Sensitive Sorting', description: 'Enable case-sensitive sorting for more precise control over the results.' },
        { icon: DocumentDuplicateIcon, title: 'One-Click Copy', description: 'Easily copy the sorted text to your clipboard for use in other applications.' }
    ]
  },
  {
    path: '/utilities/find-and-replace',
    name: 'Find and Replace Tool',
    description: 'Find and replace text quickly.',
    category: ToolCategory.UTILITY,
    component: FindAndReplaceTool,
    icon: MagnifyingGlassIcon,
    about: 'This powerful find and replace tool helps you quickly search and replace text, words, or phrases in your content. Perfect for editing documents, code, or any text-based content with precision and efficiency.',
    howTo: [
      { title: 'Enter Text', description: 'Paste or type the content you want to edit into the main text area.' },
      { title: 'Provide Terms', description: 'Enter the word to find and the word to replace it with in their respective fields.' },
      { title: 'Replace', description: 'Use "Replace All" for bulk changes or "Replace One" to step through each occurrence.' }
    ],
    features: [
      { icon: MagnifyingGlassIcon, title: 'Advanced Search', description: 'Search for exact words or phrases with options for case-sensitive matching.' },
      { icon: ArrowPathIcon, title: 'Bulk Replacement', description: 'Replace all occurrences of a word or phrase instantly.' },
      { icon: PlayIcon, title: 'Step-by-Step Control', description: 'Replace one occurrence at a time for more precise control over your text editing process.' },
      { icon: DocumentDuplicateIcon, title: 'Easy Copy', description: 'Instantly copy your edited text to the clipboard with one click.' },
    ]
  },
  {
    path: '/utilities/cps-test',
    name: 'CPS Test — Check Clicks Per Second',
    description: 'Test your clicking speed with our Clicks Per Second (CPS) test.',
    category: ToolCategory.UTILITY,
    component: CPSTest,
    icon: CursorArrowRaysIcon,
    about: 'The Clicks Per Second (CPS) Test is a fun and simple tool to measure your mouse clicking speed. It records the number of clicks you can make within a set time frame, usually 5 or 10 seconds, and then calculates your average clicks per second. It\'s a popular challenge among gamers and a great way to test your reflexes.',
    howTo: [
      { title: 'Start the Test', description: 'Click the large button that says "Click here to start".' },
      { title: 'Click Rapidly', description: 'Once the test begins, click as fast as you can inside the green area for 5 seconds.' },
      { title: 'See Your Score', description: 'After the timer runs out, your CPS score, total clicks, and rank will be displayed automatically.' }
    ],
    features: [
      { icon: ClockIcon, title: '5-Second Challenge', description: 'Test your clicking prowess in a quick and standardized 5-second sprint.' },
      { icon: TrophyIcon, title: 'Instant Results & Ranking', description: 'Get your CPS score and a performance rank immediately after the test concludes.' },
      { icon: ArrowPathIcon, title: 'Unlimited Retries', description: 'Easily restart the test with a single click to try and beat your previous score.' }
    ]
  },
  {
    path: '/utilities/barcode-scanner',
    name: 'Barcode & QR Code Scanner',
    description: 'Scan and decode barcodes and QR codes using your camera or an image file.',
    category: ToolCategory.UTILITY,
    component: BarcodeScanner,
    icon: BarcodeIcon,
    about: 'A powerful tool to decode barcodes and QR codes instantly. Use your device\'s camera for real-time scanning or upload an image file. The scanner supports a wide variety of code formats, making it a versatile utility for checking product information, accessing URLs, and more.',
    howTo: [
        { title: 'Choose Scan Method', description: 'Select whether you want to use your device camera or upload an image file.' },
        { title: 'Scan the Code', description: 'If using the camera, point it at a barcode or QR code. If uploading, select an image file containing a code.' },
        { title: 'View & Copy Result', description: 'The decoded information will appear instantly, ready for you to copy to your clipboard.' }
    ],
    features: [
        { icon: PhotoIcon, title: 'Camera & File Support', description: 'Scan codes in real-time with your camera or decode them from an uploaded image file.' },
        { icon: RocketLaunchIcon, title: 'Fast & Accurate', description: 'Powered by an advanced scanning library for quick and reliable code detection.' },
        { icon: DocumentDuplicateIcon, title: 'One-Click Copy', description: 'Easily copy the scanned data to your clipboard for use in other applications.' }
    ]
  },
  {
    path: '/utilities/flashcard-maker',
    name: 'Flashcard Maker',
    description: 'Create, manage, and study custom decks of digital flashcards.',
    category: ToolCategory.UTILITY,
    component: FlashCardMaker,
    icon: DocumentDuplicateIcon,
    about: 'A modern tool for creating and studying digital flashcards. Save multiple decks, add cards with front and back content, and enter a focused study mode with shuffle functionality. All data is saved in your browser, so your work is never lost.',
    howTo: [
      { title: 'Create a Deck', description: 'Enter a name for your new deck in the input field and click "Create". Your new deck will appear in the list.' },
      { title: 'Add Cards', description: 'Click the "Edit" button on a deck. Use the form to add the front and back text for each card. The deck saves automatically as you add cards.' },
      { title: 'Study Your Deck', description: 'Click the "Study" button to enter a focused learning mode. Click the card to flip it, use the next/prev buttons to navigate, or shuffle the deck for a random order.' }
    ],
    features: [
      { icon: DocumentDuplicateIcon, title: 'Multiple Decks', description: 'Organize your learning by creating and managing an unlimited number of flashcard decks.' },
      { icon: ShieldCheckIcon, title: 'Browser Storage', description: 'Your decks and cards are automatically saved in your browser\'s local storage, ensuring your data is private and persistent.' },
      { icon: PlayIcon, title: 'Interactive Study Mode', description: 'Engage with your material in a clean, focused study interface with smooth 3D flip animations.' },
      { icon: ArrowPathIcon, title: 'Shuffle Functionality', description: 'Randomize the order of your cards with a single click to challenge your memory and prevent rote learning.' }
    ]
  },
  {
    path: '/image/image-cropper',
    name: 'Image Cropper',
    description: 'Crop and resize images online with ease.',
    category: ToolCategory.IMAGE,
    component: ImageCropper,
    icon: PhotoIcon,
    about: 'Our online Image Cropper provides a powerful and intuitive interface to crop, resize, and edit your images directly in your browser. With support for various aspect ratios, drag-and-drop functionality, and high-quality downloads, it\'s the perfect tool for preparing images for social media, websites, or personal projects. All processing is done on your device, ensuring your files remain private and secure.',
    howTo: [
      { title: 'Upload Your Image', description: 'Click the upload area to select a file, or simply drag and drop your image onto the canvas.' },
      { title: 'Adjust the Crop Box', description: 'Drag the crop box to your desired position and use the corner handles to resize it. You can also select a preset aspect ratio.' },
      { title: 'Download Your Image', description: 'Once you are satisfied with the selection, click the "Crop & Download" button to save the cropped image as a PNG file.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Client-Side Processing', description: 'Your images are processed locally in your browser, ensuring maximum privacy and security. No files are uploaded to a server.' },
      { icon: ArrowsRightLeftIcon, title: 'Aspect Ratio Presets', description: 'Choose from common aspect ratios like 1:1 (square), 4:3, and 16:9, or use the freeform mode for custom dimensions.' },
      { icon: ArrowUpTrayIcon, title: 'Drag & Drop Upload', description: 'Quickly upload your images by dragging them from your desktop directly into the tool.' },
      { icon: DocumentDuplicateIcon, title: 'High-Quality PNG Export', description: 'Download your cropped image in the high-quality, lossless PNG format, perfect for web and print use.' }
    ]
  },
  {
    path: '/image/image-resizer',
    name: 'Image Resizer',
    description: 'Quickly resize images to exact pixel dimensions while maintaining aspect ratio.',
    category: ToolCategory.IMAGE,
    component: ImageResizer,
    icon: ArrowsPointingOutIcon,
    about: 'Our online Image Resizer is a simple yet powerful tool for changing the dimensions of your images. Whether you need to shrink a large photo for a website or enlarge a small icon, this tool lets you specify the exact width and height in pixels. You can lock the aspect ratio to prevent distortion or unlock it for custom sizing. All processing is done client-side, ensuring your images are never uploaded to a server.',
    howTo: [
      { title: 'Upload Your Image', description: 'Click the upload area to select a file, or simply drag and drop your image onto the designated area.' },
      { title: 'Enter New Dimensions', description: 'Input your desired width and/or height in the pixel fields. The aspect ratio is locked by default to prevent stretching.' },
      { title: 'Download Your Image', description: 'Once you have set the dimensions, click the "Resize & Download" button to save the new image as a PNG file.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Client-Side Privacy', description: 'Your images are resized directly in your browser. No data is sent to our servers, ensuring your files remain private.' },
      { icon: LockClosedIcon, title: 'Aspect Ratio Lock', description: 'Maintain the original proportions of your image with the aspect ratio lock to avoid distortion. You can also unlock it for free-form resizing.' },
      { icon: ArrowUpTrayIcon, title: 'Drag & Drop Upload', description: 'Quickly upload your images by dragging them from your desktop directly into the tool for a faster workflow.' },
      { icon: DocumentDuplicateIcon, title: 'High-Quality PNG Export', description: 'Download your resized image in the high-quality, lossless PNG format, perfect for any use case.' }
    ]
  },
  {
    path: '/image/image-flipper',
    name: 'Image Flipper',
    description: 'Flip images horizontally or vertically with a single click.',
    category: ToolCategory.IMAGE,
    component: ImageFlipper,
    icon: ArrowsRightLeftIcon,
    about: 'The Image Flipper is a straightforward tool that lets you mirror your images. You can flip any image horizontally (like looking in a mirror) or vertically (upside down) instantly. All processing is done in your browser, so your images are never uploaded, ensuring your privacy is protected.',
    howTo: [
      { title: 'Upload Your Image', description: 'Click the upload area to select a file, or simply drag and drop your image.' },
      { title: 'Choose Flip Direction', description: 'Click "Flip Horizontal" or "Flip Vertical" to see a live preview of the result.' },
      { title: 'Download Your Image', description: 'Once you are happy with the result, click the "Download Flipped Image" button to save it as a PNG file.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Client-Side Privacy', description: 'Your images are flipped directly in your browser. No data is ever sent to our servers.' },
      { icon: ArrowsRightLeftIcon, title: 'Horizontal Flip', description: 'Create a mirror image of your photo with a single click.' },
      { icon: ArrowsUpDownIcon, title: 'Vertical Flip', description: 'Turn your image upside down instantly.' },
      { icon: DocumentDuplicateIcon, title: 'High-Quality PNG Export', description: 'Download your flipped image in the high-quality, lossless PNG format.' }
    ]
  },
  {
    path: '/image/image-rotator',
    name: 'Image Rotator',
    description: 'Rotate images by 90-degree increments or to a precise angle.',
    category: ToolCategory.IMAGE,
    component: ImageRotator,
    icon: ArrowUturnRightIcon,
    about: 'The Image Rotator is a versatile tool for adjusting the orientation of your pictures. You can perform quick 90-degree rotations or use the slider for fine-grained control over the angle. The live preview helps you get the perfect orientation before downloading. All processing is done securely in your browser.',
    howTo: [
      { title: 'Upload Your Image', description: 'Click the upload area to select a file, or simply drag and drop your image.' },
      { title: 'Rotate the Image', description: 'Use the "Rotate Left" and "Rotate Right" buttons for 90-degree turns, or use the slider for a specific angle.' },
      { title: 'Download Your Image', description: 'Once you are happy with the rotation, click the "Download Rotated Image" button to save it as a PNG file.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Client-Side Privacy', description: 'Your images are rotated directly in your browser. No data is ever sent to our servers.' },
      { icon: ArrowUturnRightIcon, title: 'Precise Angle Control', description: 'Use the slider to rotate your image to any angle between -180 and 180 degrees.' },
      { icon: ArrowPathIcon, title: 'Quick 90-Degree Rotations', description: 'Instantly rotate your image left or right with dedicated buttons.' },
      { icon: DocumentDuplicateIcon, title: 'High-Quality PNG Export', description: 'Download your rotated image in the high-quality, lossless PNG format.' }
    ]
  },
  {
    path: '/image/passport-photo-maker',
    name: 'Passport Size Photo Maker',
    description: 'Create passport, visa, and ID photos in official sizes.',
    category: ToolCategory.IMAGE,
    component: PassportPhotoMaker,
    icon: IdentificationIcon,
    about: 'Easily create professional passport, visa, or ID photos with our Passport Size Photo Maker. This tool allows you to upload your image, crop it to precise official dimensions, adjust lighting, change the background color, and download a single photo or a full, print-ready sheet. All processing is done locally in your browser, ensuring your photos remain private.',
    howTo: [
      { title: 'Upload Photo', description: 'Start by uploading your photo from your device.' },
      { title: 'Select Size & Crop', description: 'Choose a predefined size (e.g., 3.5x4.5cm, 2x2 inches) and crop the image to meet official requirements.' },
      { title: 'Edit & Adjust', description: 'Adjust brightness, contrast, and saturation. Change the background color to white, blue, or any other color.' },
      { title: 'Download', description: 'Download the final image as a single photo or a formatted sheet for printing on A4, Half A4, or custom sizes.' }
    ],
    features: [
      { icon: PhotoIcon, title: 'Custom Size Selection', description: 'Choose from predefined standard sizes or create your own custom dimensions for any ID requirement.' },
      { icon: PencilIcon, title: 'Image Customization', description: 'Fine-tune your photo with sliders for brightness, contrast, and saturation.' },
      { icon: TrashIcon, title: 'Background Color Changer', description: 'Instantly change the background of your photo to a solid color to meet official guidelines.' },
      { icon: DocumentDuplicateIcon, title: 'Print-Ready Sheets', description: 'Download images formatted for online submission or for easy printing on various sheet sizes.' }
    ]
  },
  {
    path: '/image/add-watermark',
    name: 'Add Watermark to Image',
    description: 'Add custom text or image watermarks to your pictures.',
    category: ToolCategory.IMAGE,
    component: AddWatermark,
    icon: PencilSquareIcon,
    about: 'Protect your images with our powerful and flexible watermarking tool. Add custom text or your own logo as a watermark, then easily adjust its position, size, rotation, and transparency. You can even create a tiled pattern for maximum protection. All processing is done in your browser, so your files are never uploaded to our servers.',
    howTo: [
      { title: 'Upload Your Image', description: 'Drag and drop or select an image file to get started.' },
      { title: 'Choose Watermark Type', description: 'Select between adding a "Text" watermark or an "Image" watermark (like a logo).' },
      { title: 'Customize and Position', description: 'Use the controls to change the content, font, color, and size. Drag, resize, and rotate the watermark directly on the preview.' },
      { title: 'Download Your Image', description: 'Click the download button to save your watermarked image.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Browser-Based Processing', description: 'Your files remain private and secure; no data is stored on our servers.' },
      { icon: PencilIcon, title: 'Full Customization', description: 'Adjust size, rotation, transparency, font, and color. Drag the watermark anywhere on the image.' },
      { icon: PhotoIcon, title: 'Image & Text Watermarks', description: 'Use your own logo or create a custom text overlay with various styling options.' },
      { icon: ArrowsPointingOutIcon, title: 'Tiled Watermark Effect', description: 'Enhance protection by repeating your watermark in a pattern across the entire image.' }
    ]
  },
  {
    path: '/image/compress-jpg',
    name: 'Compress JPG Image',
    description: 'Reduce the file size of your JPG images with adjustable quality.',
    category: ToolCategory.IMAGE,
    component: CompressJPG,
    icon: ArrowsPointingInIcon,
    about: 'Our JPG Compressor allows you to reduce the file size of your JPEG images by adjusting the quality. It provides a live preview and shows the estimated file size, so you can find the perfect balance between size and quality. All compression is done in your browser for maximum privacy.',
    howTo: [
      { title: 'Upload Your JPG', description: 'Drag and drop or select a JPG/JPEG image file.' },
      { title: 'Adjust Quality', description: 'Use the slider to set your desired quality level. A lower quality results in a smaller file size.' },
      { title: 'Download Image', description: 'See the new file size and download your compressed image.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Client-Side Compression', description: 'Your images are processed securely in your browser and are never uploaded to a server.' },
      { icon: PencilIcon, title: 'Adjustable Quality', description: 'A simple slider lets you control the compression level from 0 to 100.' },
      { icon: PhotoIcon, title: 'Live Preview', description: 'Instantly see how the quality of your image changes as you adjust the compression.' },
      { icon: DocumentTextIcon, title: 'File Size Comparison', description: 'Compare the original file size with the new, compressed size before downloading.' }
    ]
  },
    {
    path: '/image/compress-jpg-to-50kb',
    name: 'Compress JPG to 50kb',
    description: 'Quickly compress your JPG images to a file size of 50kb or less.',
    category: ToolCategory.IMAGE,
    component: CompressJPGTo50kb,
    icon: ArrowsPointingInIcon,
    about: 'This tool is designed to save you time by swiftly compressing your images to meet portal size limits of 50kb without hassle. Our advanced compression technology reduces file sizes while maintaining image quality, ensuring your compressed JPGs remain clear and vibrant.',
    howTo: [
      { title: 'Upload Your JPG', description: 'Drag and drop or select a JPG/JPEG image file.' },
      { title: 'Automatic Compression', description: 'The tool automatically finds the best quality for a file size under 50kb.' },
      { title: 'Download Image', description: 'Download your perfectly sized image with a single click.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Secure & Private', description: 'Our tool prioritizes the security and confidentiality of your images. All compression happens in your browser.' },
      { icon: RocketLaunchIcon, title: 'Rapid Compression', description: 'This tool is designed to save you time, swiftly compressing images to meet portal size limits without hassle.' },
      { icon: PhotoIcon, title: 'Quality Conscious', description: 'Our advanced compression technology finds the best quality possible for your target size, ensuring your JPGs remain clear and vibrant.' }
    ]
  },
  {
    path: '/image/compress-jpg-to-100kb',
    name: 'Compress JPG to 100kb',
    description: 'Quickly compress your JPG images to a file size of 100kb or less.',
    category: ToolCategory.IMAGE,
    component: CompressJPGTo100kb,
    icon: ArrowsPointingInIcon,
    about: 'This tool is designed to save you time by swiftly compressing your images to meet portal size limits of 100kb without hassle. Our advanced compression technology reduces file sizes while maintaining image quality, ensuring your compressed JPGs remain clear and vibrant.',
    howTo: [
      { title: 'Upload Your JPG', description: 'Drag and drop or select a JPG/JPEG image file.' },
      { title: 'Automatic Compression', description: 'The tool automatically finds the best quality for a file size under 100kb.' },
      { title: 'Download Image', description: 'Download your perfectly sized image with a single click.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Secure & Private', description: 'Our tool prioritizes the security and confidentiality of your images. All compression happens in your browser.' },
      { icon: RocketLaunchIcon, title: 'Rapid Compression', description: 'This tool is designed to save you time, swiftly compressing images to meet portal size limits without hassle.' },
      { icon: PhotoIcon, title: 'Quality Conscious', description: 'Our advanced compression technology finds the best quality possible for your target size, ensuring your JPGs remain clear and vibrant.' }
    ]
  },
  {
    path: '/image/compress-jpg-to-200kb',
    name: 'Compress JPG to 200kb',
    description: 'Quickly compress your JPG images to a file size of 200kb or less.',
    category: ToolCategory.IMAGE,
    component: CompressJPGTo200kb,
    icon: ArrowsPointingInIcon,
    about: 'This tool is designed to save you time by swiftly compressing your images to meet portal size limits of 200kb without hassle. Our advanced compression technology reduces file sizes while maintaining image quality, ensuring your compressed JPGs remain clear and vibrant.',
    howTo: [
      { title: 'Upload Your JPG', description: 'Drag and drop or select a JPG/JPEG image file.' },
      { title: 'Automatic Compression', description: 'The tool automatically finds the best quality for a file size under 200kb.' },
      { title: 'Download Image', description: 'Download your perfectly sized image with a single click.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Secure & Private', description: 'Our tool prioritizes the security and confidentiality of your images. All compression happens in your browser.' },
      { icon: RocketLaunchIcon, title: 'Rapid Compression', description: 'This tool is designed to save you time, swiftly compressing images to meet portal size limits without hassle.' },
      { icon: PhotoIcon, title: 'Quality Conscious', description: 'Our advanced compression technology finds the best quality possible for your target size, ensuring your JPGs remain clear and vibrant.' }
    ]
  },
  {
    path: '/image/increase-jpg-size',
    name: 'Increase JPG Size',
    description: 'Increase the file size of a JPG to meet minimum requirements.',
    category: ToolCategory.IMAGE,
    component: IncreaseJPGSize,
    icon: ArrowTrendingUpIcon,
    about: 'This tool helps you increase the file size of a JPG image, which can be useful for meeting minimum file size requirements for online submissions. It works by adding a small amount of invisible noise and re-saving the image at maximum quality, effectively "bloating" the file size.',
    howTo: [
      { title: 'Upload Your JPG', description: 'Drag and drop or select a JPG/JPEG image file.' },
      { title: 'Set Bloat Level', description: 'Use the slider to control how much invisible noise is added. A higher level means a larger file size.' },
      { title: 'Download Image', description: 'Download the new, larger JPG file.' }
    ],
    features: [
      { icon: ShieldCheckIcon, title: 'Secure & Private', description: 'All processing happens in your browser. Your images are never uploaded.' },
      { icon: ArrowTrendingUpIcon, title: 'File Size Control', description: 'Use a simple "Bloat Level" slider to increase the final file size.' },
      { icon: DocumentTextIcon, title: 'Instant Size Update', description: 'See the new estimated file size as you adjust the settings.' },
      { icon: PhotoIcon, title: 'Visually Lossless', description: 'The tool adds noise that is practically invisible, preserving the visual quality of your image.' }
    ]
  },
  {
    path: '/generators/invoice-generator',
    name: 'Invoice Generator',
    description: 'Create and download professional invoices.',
    category: ToolCategory.GENERATOR,
    component: InvoiceGenerator,
    icon: DocumentChartBarIcon,
    about: 'Our Invoice Generator makes creating professional invoices effortless. Customize templates, add your logo, calculate totals with taxes, and download print-ready PDFs. Perfect for freelancers and small businesses looking to streamline their billing process.',
    howTo: [
        { title: 'Fill in Details', description: 'Enter your business info, client details, and line items with descriptions, quantities, and prices.' },
        { title: 'Customize Your Invoice', description: 'Add your company logo, select a template, and specify tax rates or discounts.' },
        { title: 'Download or Send', description: 'Preview your invoice, then download it as a PDF or send it directly to your client.' }
    ],
    features: [
        { icon: PencilIcon, title: 'Easy Customization', description: 'Add logos, change colors, and tailor the invoice layout to match your brand identity.' },
        { icon: CalculatorIcon, title: 'Automatic Calculations', description: 'Automatically calculates subtotals, taxes, and grand totals to prevent errors.' },
        { icon: DocumentDuplicateIcon, title: 'Download as PDF', description: 'Generate professional, print-ready PDF invoices with a single click.' }
    ],
  },
  {
    path: '/converters/preeti-to-unicode',
    name: 'Preeti to Unicode',
    description: 'Convert Preeti font text to Nepali Unicode.',
    category: ToolCategory.CONVERTER,
    component: PreetiToUnicode,
    icon: LanguageIcon,
    about: 'Easily convert traditional Preeti font text into standard Nepali Unicode. This tool is essential for modernizing old documents, ensuring web compatibility, and making your Nepali text searchable and universally accessible across all devices and platforms.',
    howTo: [
        { title: 'Paste Preeti Text', description: 'Copy the text written in Preeti font and paste it into the input box.' },
        { title: 'Click Convert', description: 'Press the convert button to instantly get the Unicode equivalent.' },
        { title: 'Copy Unicode', description: 'Your text is now in standard Unicode. Copy it for use in websites, documents, or social media.' }
    ],
    features: [
        { icon: ArrowPathIcon, title: 'Accurate Conversion', description: 'Our tool uses an advanced conversion engine for high accuracy between Preeti and Unicode.' },
        { icon: LanguageIcon, title: 'Web Compatibility', description: 'Ensure your Nepali text is readable and searchable on any modern browser or device.' },
        { icon: DocumentTextIcon, title: 'Bulk Processing', description: 'Convert large blocks of text at once, saving time when updating legacy documents.' }
    ],
  },
  {
    path: '/converters/word-case-converter',
    name: 'Word Case Converter',
    description: 'Convert text between different letter cases.',
    category: ToolCategory.CONVERTER,
    component: WordCaseConverter,
    icon: CharacterSpacingIcon,
    about: 'The Word Case Converter tool allows you to easily transform the case of your text. With options for UPPERCASE, lowercase, Title Case, and Sentence case, it\'s perfect for editors, writers, and anyone who needs to quickly format their text for headlines, titles, or articles.',
    howTo: [
        { title: 'Enter Your Text', description: 'Paste or type the text you want to convert into the text area.' },
        { title: 'Choose a Case', description: 'Select one of the available case options, such as UPPERCASE or Title Case.' },
        { title: 'Copy the Result', description: 'Your text is instantly converted. Copy it to your clipboard for immediate use.' }
    ],
    features: [
        { icon: CharacterSpacingIcon, title: 'Multiple Case Formats', description: 'Switch between UPPERCASE, lowercase, Title Case, Sentence case, and more.' },
        { icon: PlayIcon, title: 'Instant Conversion', description: 'See your text transform in real-time as you select different case options.' },
        { icon: DocumentDuplicateIcon, title: 'One-Click Copy', description: 'Effortlessly copy the formatted text to your clipboard.' }
    ],
  },
  {
    path: '/pdf/jpg-to-pdf',
    name: 'JPG to PDF Converter',
    description: 'Combine multiple JPG images into a single PDF file.',
    category: ToolCategory.PDF,
    component: JpgToPdfConverter,
    icon: DocumentArrowUpIcon,
    about: 'Our JPG to PDF Converter allows you to easily merge multiple JPG images into one PDF document. You can reorder images, choose page sizes, and set orientations before creating your PDF. It\'s a fast, client-side tool that respects your privacy.',
    howTo: [
      { title: 'Upload Images', description: 'Click to select or drag and drop your JPG files into the upload area.' },
      { title: 'Arrange & Configure', description: 'Reorder the images as you like. Select the page size and orientation for your PDF.' },
      { title: 'Generate PDF', description: 'Click the "Generate PDF" button to combine your images into a single PDF file, which will be downloaded automatically.' }
    ],
    features: [
      { icon: ArrowUpTrayIcon, title: 'Multiple File Upload', description: 'Upload and convert several JPG images at once.' },
      { icon: ArrowsUpDownIcon, title: 'Image Reordering', description: 'Easily re-arrange the order of your images before converting to get the perfect sequence.' },
      { icon: PencilIcon, title: 'Page Customization', description: 'Choose from standard page sizes (like A4, Letter) and set the page orientation (Portrait or Landscape).' },
      { icon: ShieldCheckIcon, title: 'Client-Side & Secure', description: 'All processing is done in your browser. Your images are never sent to a server.' }
    ]
  },
  {
    path: '/pdf/pdf-to-images',
    name: 'PDF to Images Converter',
    description: 'Convert each page of a PDF document into separate image files.',
    category: ToolCategory.PDF,
    component: PdfToImagesConverter,
    icon: PhotoIcon,
    about: 'Extract pages from a PDF document and save them as high-quality images. Our PDF to Images Converter lets you choose the output format (PNG or JPG) and select which pages to convert. It\'s a perfect tool for when you need to use PDF content in presentations, web pages, or social media.',
    howTo: [
      { title: 'Upload PDF', description: 'Select a PDF file from your device.' },
      { title: 'Select Pages & Format', description: 'Preview all pages and select the ones you want to convert. Choose your desired image format (PNG/JPG) and quality.' },
      { title: 'Convert & Download', description: 'Click the convert button. The selected pages will be downloaded as individual image files.' }
    ],
    features: [
      { icon: DocumentTextIcon, title: 'Page-by-Page Conversion', description: 'Convert an entire PDF or select specific pages to turn into images.' },
      { icon: PhotoIcon, title: 'Multiple Formats', description: 'Choose to save your images as PNG for quality or JPG for smaller file sizes.' },
      { icon: PencilSquareIcon, title: 'Quality Control', description: 'Adjust the quality of JPG images to balance file size and visual fidelity.' },
      { icon: RocketLaunchIcon, title: 'Fast & In-Browser', description: 'Your PDF is processed quickly and securely right in your web browser.' }
    ]
  },
  {
    path: '/pdf/pdf-to-word',
    name: 'PDF to Word Converter',
    description: 'Convert PDF files to editable Word documents.',
    category: ToolCategory.PDF,
    component: PdfToWordConverter,
    icon: DocumentArrowDownIcon,
    about: 'This tool will allow you to convert your PDF documents into editable Microsoft Word (.docx) files, preserving the layout and formatting as much as possible. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Upload your PDF file.' },
      { title: 'Coming Soon', description: 'The tool will process the file and create a Word document.' },
      { title: 'Coming Soon', description: 'Download the converted .docx file.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you a high-quality, client-side PDF to Word conversion tool.' },
      { icon: DocumentTextIcon, title: 'Editable Documents', description: 'Once launched, you will be able to edit your PDF content easily in Microsoft Word.' },
      { icon: ShieldCheckIcon, title: 'Privacy Focused', description: 'Like our other tools, this will be a fully client-side converter.' }
    ]
  },
  {
    path: '/pdf/web-optimize-pdf',
    name: 'Web Optimize PDF',
    description: 'Compress and optimize PDF files for web and email.',
    category: ToolCategory.PDF,
    component: WebOptimizePdf,
    icon: WrenchScrewdriverIcon,
    about: 'Reduce the file size of your PDF documents to make them easier to share via email or post on the web. This tool will offer various compression levels to balance file size and quality. This feature is coming soon.',
    howTo: [
      { title: 'Coming Soon', description: 'Upload the PDF file you want to compress.' },
      { title: 'Coming Soon', description: 'Choose a compression level (e.g., high, medium, low).' },
      { title: 'Coming Soon', description: 'Download your optimized, smaller PDF file.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are building a powerful PDF optimization tool that runs entirely in your browser.' },
      { icon: ArrowsPointingInIcon, title: 'Significant Size Reduction', description: 'Will help you shrink large PDFs without a major loss in quality.' },
      { icon: RocketLaunchIcon, title: 'Faster Sharing', description: 'Optimized PDFs are quicker to upload, download, and send.' }
    ]
  },
  {
    path: '/pdf/merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF documents into a single file.',
    category: ToolCategory.PDF,
    component: MergePdf,
    icon: DocumentPlusIcon,
    about: 'This tool will allow you to merge several PDF files into one document, in the order you specify. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Upload the PDF files you want to combine.' },
      { title: 'Coming Soon', description: 'Arrange the files into the desired order.' },
      { title: 'Coming Soon', description: 'Click "Merge" to download the combined PDF.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are working hard to bring you a powerful, client-side PDF merging tool.' },
      { icon: ArrowUpTrayIcon, title: 'Multiple Files', description: 'Will support uploading and combining many PDFs at once.' },
      { icon: ShieldCheckIcon, title: 'Privacy Focused', description: 'Like our other tools, this will be a fully client-side converter.' }
    ]
  },
  {
    path: '/pdf/split-pdf',
    name: 'Split PDF',
    description: 'Extract pages or split a PDF into multiple files.',
    category: ToolCategory.PDF,
    component: SplitPdf,
    icon: ScissorsIcon,
    about: 'This tool will allow you to split a single PDF file into multiple smaller PDFs, either by extracting specific pages, page ranges, or splitting every page into a separate file. This feature is currently under development.',
    howTo: [
      { title: 'Coming Soon', description: 'Upload the PDF file you want to split.' },
      { title: 'Coming Soon', description: 'Choose your splitting options (e.g., by page range).' },
      { title: 'Coming Soon', description: 'Download your new, smaller PDF files.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are building a versatile PDF splitting tool that runs in your browser.' },
      { icon: DocumentTextIcon, title: 'Flexible Options', description: 'Will allow splitting by range, extracting pages, and more.' },
      { icon: ShieldCheckIcon, title: 'Privacy Focused', description: 'Your documents will be processed locally on your device.' }
    ]
  },
  {
    path: '/pdf/sign-pdf',
    name: 'Sign PDF',
    description: 'Add your signature to a PDF document.',
    category: ToolCategory.PDF,
    component: SignPdf,
    icon: PencilSquareIcon,
    about: 'This tool will enable you to easily add a signature to your PDF documents. You will be able to draw a signature, type one, or upload an image of your signature. This feature is coming soon.',
    howTo: [
      { title: 'Coming Soon', description: 'Upload the PDF document you need to sign.' },
      { title: 'Coming Soon', description: 'Create or upload your signature.' },
      { title: 'Coming Soon', description: 'Place your signature on the document and download it.' }
    ],
    features: [
      { icon: ClockIcon, title: 'Under Development', description: 'We are developing an intuitive and secure PDF signing tool.' },
      { icon: PencilIcon, title: 'Multiple Signature Types', description: 'Will support drawing, typing, or uploading a signature.' },
      { icon: ShieldCheckIcon, title: 'Client-Side Security', description: 'Your signature and documents will not be uploaded to any server.' }
    ]
  },
];