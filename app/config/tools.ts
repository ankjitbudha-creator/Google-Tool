import { Tool, ToolCategory } from '../types';
import { BMICalculator } from '../components/tools/calculators/BMICalculator';
import { TipCalculator } from '../components/tools/calculators/TipCalculator';
import { AgeCalculator } from '../components/tools/calculators/AgeCalculator';
import { UnitConverter } from '../components/tools/converters/UnitConverter';
import { TemperatureConverter } from '../components/tools/converters/TemperatureConverter';
import { NepaliDateConverter } from '../components/tools/converters/NepaliDateConverter';
import { PasswordGenerator } from '../components/tools/generators/PasswordGenerator';
import { WordCounter } from '../components/tools/utilities/WordCounter';
import { FindAndReplaceTool } from '../components/tools/utilities/FindAndReplaceTool';
import { PlaceholderToolPage } from '../components/tools/PlaceholderToolPage';
import { CPSTest } from '../components/tools/utilities/CPSTest';
import { ImageCropper } from '../components/tools/image/ImageCropper';
import { ImageResizer } from '../components/tools/image/ImageResizer';
import { ImageFlipper } from '../components/tools/image/ImageFlipper';
import { ImageRotator } from '../components/tools/image/ImageRotator';
import { PassportPhotoMaker } from '../components/tools/image/PassportPhotoMaker';
import { AddWatermark } from '../components/tools/image/AddWatermark';
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
  ArrowsUpDownIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
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