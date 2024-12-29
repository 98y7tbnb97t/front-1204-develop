import { useState, useEffect, useRef, FC } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	AutoLink,
	AutoImage,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	HorizontalLine,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	Paragraph,
	RemoveFormat,
	SelectAll,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Subscript,
	Superscript,

	Underline,
	Undo,
	EditorConfig,
	EventInfo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ru.js';

import 'ckeditor5/ckeditor5.css';
import classNames from 'classnames';

interface TextEditorProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
	minHeight?: number;
}

const TextEditor: FC<TextEditorProps> = ({onChange, className, value, minHeight}) => {
	const editorContainerRef = useRef(null);
	const editorRef = useRef<ClassicEditor | null>(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);


    
	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig: EditorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'fontSize',
				'fontFamily',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'insertImageViaUrl',
				'subscript',
				'superscript',
				'code',
				'removeFormat',
				'|',
				'specialCharacters',
				'horizontalLine',
				'link',
				'highlight',
				'blockQuote',
				'codeBlock',
				'|',
				'alignment',
				'|',
				'outdent',
				'indent'
			],
			shouldNotGroupWhenFull: true
		},
		plugins: [
			AccessibilityHelp,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			
			Alignment,
			AutoLink,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			Essentials,
			Heading,
			Highlight,
			HorizontalLine,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			Paragraph,
			RemoveFormat,
			SelectAll,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Strikethrough,
			Subscript,
			Superscript,
			Underline,
			Undo
		],
		fontFamily: {
            options: [
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif'
            ]
		},
		fontSize: {
			options: [10, 12, 14, 'default', 18, 20, 22],
			supportAllValues: true
		},
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		image: {
			toolbar: [
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage'
			]
		},
		language: 'ru',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		placeholder: 'Type or paste your content here!',
		translations: [translations]
	};
    
    const onReady = (editor: ClassicEditor) => {
        editorRef.current = editor;
        editor.execute( 'fontFamily', { value: 'Arial' } );
		// editor.model.document.on('change:data', () => {
		// 	const data = editor.getData();
		// 	editor.getData({
				
		// 	})
		// 	onChange(data);
		// });
    }

	const onChangeHandler = (_: EventInfo, editor: ClassicEditor) => {
		const data = editor.getData();
		onChange(data);
	}

	return (
		<div>
			{minHeight && <style>
			{`
			.ck-content {
				min-height: ${minHeight}px !important;
			}
			`}
			</style>}
			<div className={classNames('w-full', {}, [className])}>
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
						<div>{isLayoutReady && 
							<CKEditor
								data={value}
								onReady={onReady}
								editor={ClassicEditor}
								config={editorConfig}
								onChange={onChangeHandler}
							/>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TextEditor;