import { Tool, ToolCategory } from '../types';
import { BMICalculator } from '../pages/calculators/BMICalculator';
import { TipCalculator } from '../pages/calculators/TipCalculator';
import { AgeCalculator } from '../pages/calculators/AgeCalculator';
import { UnitConverter } from '../pages/converters/UnitConverter';
import { TemperatureConverter } from '../pages/converters/TemperatureConverter';
import { NepaliDateConverter } from '../pages/converters/NepaliDateConverter';
import { PasswordGenerator } from '../pages/generators/PasswordGenerator';
import { WordCounter } from '../pages/utilities/WordCounter';
import { FindAndReplaceTool } from '../pages/utilities/FindAndReplaceTool';
import { PlaceholderToolPage } from '../pages/PlaceholderToolPage';
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
  CharacterSpacingIcon
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
    path: '/generators/invoice-generator',
    name: 'Invoice Generator',
    description: 'Create and download professional invoices.',
    category: ToolCategory.GENERATOR,
    component: PlaceholderToolPage,
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
    component: PlaceholderToolPage,
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
    component: PlaceholderToolPage,
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
];