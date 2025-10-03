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
  ClipboardDocumentListIcon,
  ArrowsUpDownIcon
} from '../components/Icons';

export const tools: Tool[] = [
  {
    path: '/calculators/bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight status.',
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
    description: 'Quickly calculate tips and split the bill between any number of people.',
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
        { icon: ArrowsRightLeftIcon, title: 'Bill Splitting', description: 'Effortlessly divide the total amount, including the tip, among any number of people.' }
    ]
  },
  {
    path: '/calculators/age',
    name: 'Age Calculator',
    description: 'Find your exact age in years, months, and days from your birth date.',
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
        { icon: CalculatorIcon, title: 'Total Lived Statistics', description: 'Provides additional fun facts, including your age in total months, weeks, and days.' },
        { icon: ShieldCheckIcon, title: 'Date Validation', description: 'Includes smart validation to ensure you enter a valid and logical date of birth.' }
    ]
  },
  {
    path: '/converters/unit',
    name: 'Unit Converter',
    description: 'Convert between various units of measurement for length, weight, volume, and more.',
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
        { icon: CalculatorIcon, title: 'Multiple Categories', description: 'Supports conversions for length, weight, volume, area, and more.' },
        { icon: ArrowsRightLeftIcon, title: 'Swap Units', description: 'Instantly swap the "from" and "to" units with a single click for reverse conversions.' },
        { icon: CalculatorIcon, title: 'Real-Time Conversion', description: 'The converted value updates automatically as you type, providing immediate answers.' }
    ]
  },
  {
    path: '/converters/temperature',
    name: 'Temperature Converter',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin scales.',
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
    description: 'Convert dates between Nepali (BS) and English (AD) calendars.',
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
    description: 'Create strong, secure, and customizable random passwords.',
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
    description: 'Instantly count words, characters, and paragraphs in your text.',
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
    description: 'Search and replace words, phrases, or patterns in your text with advanced options.',
    category: ToolCategory.UTILITY,
    component: FindAndReplaceTool,
    icon: MagnifyingGlassIcon,
    about: 'This powerful find and replace tool helps you quickly search and replace text, words, or phrases in your content. Perfect for editing documents, code, or any text-based content with precision and efficiency.',
    howTo: [
      { title: 'Replace All', description: 'Finds every occurrence of the search term and replaces them simultaneously.' },
      { title: 'Replace One', description: 'Finds and replaces one occurrence at a time for precise control.' }
    ],
    features: [
      { icon: MagnifyingGlassIcon, title: 'Advanced Search', description: 'Search for exact words, phrases, or patterns in your text with case-sensitive options for precise matching and replacement operations.' },
      { icon: ArrowPathIcon, title: 'Bulk Replacement', description: 'Replace all occurrences of a word or phrase instantly, or replace one at a time for more control over your text editing process.' },
      { icon: ShieldCheckIcon, title: 'Case Sensitivity', description: 'Toggle case-sensitive search to match exact capitalization or ignore case differences for more flexible text processing.' },
      { icon: DocumentDuplicateIcon, title: 'Easy Copy', description: 'Instantly copy your edited text to clipboard with one click, making it easy to use your processed content in other applications.' },
      { icon: DocumentTextIcon, title: 'Text Processing', description: 'Perfect for editing documents, cleaning up data, formatting text, or making bulk changes to any text-based content quickly and efficiently.' },
      { icon: PencilIcon, title: 'User-Friendly', description: 'Simple and intuitive interface makes text editing accessible to everyone, from beginners to advanced users working with complex text processing tasks.' }
    ]
  },
  {
    path: '/generators/invoice-generator',
    name: 'Invoice Generator',
    description: 'Create professional invoices quickly and easily.',
    category: ToolCategory.GENERATOR,
    component: PlaceholderToolPage,
    icon: ClipboardDocumentListIcon,
    about: 'This tool is currently under development. Soon, you will be able to create, customize, and download professional invoices for your business needs.',
    howTo: [{ title: 'Coming Soon', description: 'This feature is not yet available.' }],
    features: [],
  },
  {
    path: '/converters/preeti-to-unicode',
    name: 'Preeti to Unicode',
    description: 'Convert legacy Preeti font text to standard Nepali Unicode.',
    category: ToolCategory.CONVERTER,
    component: PlaceholderToolPage,
    icon: LanguageIcon,
    about: 'This tool is currently under development. It will provide a seamless way to convert text written in the popular Preeti font to the universal Unicode standard for Nepali text.',
    howTo: [{ title: 'Coming Soon', description: 'This feature is not yet available.' }],
    features: [],
  },
  {
    path: '/converters/word-case-converter',
    name: 'Word Case Converter',
    description: 'Change text casing to uppercase, lowercase, title case, and more.',
    category: ToolCategory.CONVERTER,
    component: PlaceholderToolPage,
    icon: ArrowsUpDownIcon,
    about: 'This tool is currently under development. It will allow you to easily convert blocks of text into various case formats, such as UPPERCASE, lowercase, Title Case, and Sentence case.',
    howTo: [{ title: 'Coming Soon', description: 'This feature is not yet available.' }],
    features: [],
  },
];