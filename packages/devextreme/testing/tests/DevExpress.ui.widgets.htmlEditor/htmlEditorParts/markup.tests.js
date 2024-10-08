import $ from 'jquery';

import 'ui/html_editor';
import 'ui/html_editor/converters/markdown';
import config from 'core/config';

const HTML_EDITOR_CLASS = 'dx-htmleditor';
const QUILL_CONTAINER_CLASS = 'dx-quill-container';
const HTML_EDITOR_CONTENT_CLASS = 'dx-htmleditor-content';
const HTML_EDITOR_SUBMIT_ELEMENT_CLASS = 'dx-htmleditor-submit-element';
const HTML_EDITOR_OUTLINED_CLASS = 'dx-htmleditor-outlined';
const HTML_EDITOR_FILLED_CLASS = 'dx-htmleditor-filled';
const HTML_EDITOR_UNDERLINED_CLASS = 'dx-htmleditor-filled';

const { test, skip } = QUnit;

export default function() {
    QUnit.module('Base markup', () => {
        test('render markup', function(assert) {
            const instance = $('#htmlEditor').dxHtmlEditor({
                value: '<h1>Hi!</h1><p>Test</p>'
            }).dxHtmlEditor('instance');
            const $element = instance.$element();
            const $submitElement = $element.find(`.${HTML_EDITOR_SUBMIT_ELEMENT_CLASS}`);

            assert.ok($element.hasClass(HTML_EDITOR_CLASS), 'Widget has a specific class on the root level');
            assert.ok($element.children().hasClass(QUILL_CONTAINER_CLASS), 'Widget has a child marked as quill container');
            assert.equal($element.find(`.${QUILL_CONTAINER_CLASS}`).text(), 'Hi!Test');

            assert.equal($submitElement.length, 1, 'Submit element rendered');
            assert.equal($submitElement.val(), '<h1>Hi!</h1><p>Test</p>', 'It\'s value equal to the editor\'s value');

            const isQuillRendered = !!$element.find(`.${HTML_EDITOR_CONTENT_CLASS}`).length;
            assert.equal(!!instance._deltaConverter, isQuillRendered, 'Delta converter isn\'t initialized at SSR');
            assert.equal(!!instance._quillRegistrator, isQuillRendered, 'Quill registrator isn\'t initialized at SSR');
        });

        test('name options should be applies to the submit element', function(assert) {
            const instance = $('#htmlEditor').dxHtmlEditor({
                name: 'Test'
            }).dxHtmlEditor('instance');
            const $submitElement = instance.$element().find(`.${HTML_EDITOR_SUBMIT_ELEMENT_CLASS}`);

            assert.equal($submitElement.attr('name'), 'Test', 'It\'s the right name');

            instance.option('name', 'New');

            assert.equal($submitElement.attr('name'), 'New', 'It\'s the right new name');
        });

        skip('render markdown markup', function(assert) {
            const instance = $('#htmlEditor').dxHtmlEditor({
                value: '*Test* **text**',
                valueType: 'markdown'
            }).dxHtmlEditor('instance');
            const $element = instance.$element();

            const $htmlEditorContent = $element.find(`.${HTML_EDITOR_CONTENT_CLASS}`);
            const isQuillRendered = !!$htmlEditorContent.length;
            const $content = isQuillRendered ? $htmlEditorContent : $element.find(`.${QUILL_CONTAINER_CLASS}`);

            assert.ok($element.hasClass(HTML_EDITOR_CLASS), 'Widget has a specific class on the root level');
            assert.ok($element.children().hasClass(QUILL_CONTAINER_CLASS), 'Widget has a child marked as quill container');
            assert.equal($content.html(), '<p><em>Test</em> <strong>text</strong></p>');

            assert.equal(!!instance._deltaConverter, isQuillRendered, 'Delta converter isn\'t initialized at SSR');
            assert.equal(!!instance._quillRegistrator, isQuillRendered, 'Quill registrator isn\'t initialized at SSR');
        });

        test('change value', function(assert) {
            const instance = $('#htmlEditor').dxHtmlEditor({
                value: '<h1>Hi!</h1><p>Test</p>'
            }).dxHtmlEditor('instance');
            const $element = instance.$element();
            const $submitElement = $element.find(`.${HTML_EDITOR_SUBMIT_ELEMENT_CLASS}`);

            instance.option('value', '<p>New value</p>');
            assert.equal($element.find(`.${QUILL_CONTAINER_CLASS}`).text(), 'New value');
            assert.equal($submitElement.val(), '<p>New value</p>', 'Submit element\'s value equal to the editor\'s value');

            const isQuillRendered = !!$element.find(`.${HTML_EDITOR_CONTENT_CLASS}`).length;
            assert.equal(!!instance._deltaConverter, isQuillRendered, 'Delta converter isn\'t initialized at SSR');
            assert.equal(!!instance._quillRegistrator, isQuillRendered, 'Quill registrator isn\'t initialized at SSR');
        });

        test('styling mode', function(assert) {
            const $element = $('#htmlEditor').dxHtmlEditor({
                value: 'Test',
                stylingMode: 'outlined'
            });

            assert.ok($element.hasClass(HTML_EDITOR_OUTLINED_CLASS), 'has outlined mode class');
            assert.notOk($element.hasClass(HTML_EDITOR_FILLED_CLASS), 'has no filled mode class');
            assert.notOk($element.hasClass(HTML_EDITOR_UNDERLINED_CLASS), 'has no underlined mode class');
        });

        test('change styling mode', function(assert) {
            const instance = $('#htmlEditor').dxHtmlEditor({
                value: 'Test',
                stylingMode: 'outlined'
            }).dxHtmlEditor('instance');
            const $element = instance.$element();

            instance.option('stylingMode', 'filled');

            assert.notOk($element.hasClass(HTML_EDITOR_OUTLINED_CLASS), 'has no old styling mode class');
            assert.ok($element.hasClass(HTML_EDITOR_FILLED_CLASS), 'has new styling mode class');
        });
    });

    QUnit.module('Accessibility', () => {
        test('aria-readonly should be set on initialization if readOnly=true (T1248155)', function(assert) {
            const $element = $('#htmlEditor');

            $element.dxHtmlEditor({
                readOnly: true
            });

            const $editorContent = $element.find(`.${HTML_EDITOR_CONTENT_CLASS}`);
            const isQuillRendered = !!$editorContent.length;

            assert.expect(isQuillRendered ? 1 : 0);

            if(isQuillRendered) {
                assert.strictEqual($editorContent.attr('aria-readonly'), 'true', 'aria-readonly is set on initialization');
            }
        });

        test('aria-readonly should be set if readOnly property is set to true on runtime (T1248155) (T1248155)', function(assert) {
            const $element = $('#htmlEditor');

            $element.dxHtmlEditor({
                readOnly: false
            });
            const instance = $element.dxHtmlEditor('instance');

            const $editorContent = $element.find(`.${HTML_EDITOR_CONTENT_CLASS}`);
            const isQuillRendered = !!$editorContent.length;

            assert.expect(isQuillRendered ? 2 : 0);

            if(isQuillRendered) {
                assert.strictEqual($editorContent.attr('aria-readonly'), undefined, 'aria-readonly is properly set on initialization');

                instance.option('readOnly', true);
                assert.strictEqual($editorContent.attr('aria-readonly'), 'true', 'aria-readonly is properly set on runtime');
            }
        });

        test('accessibility roles', function(assert) {
            const $element = $('#htmlEditor');

            $element.dxHtmlEditor({
                value: '<p>Test</p>'
            });

            const $editorContent = $element.find(`.${HTML_EDITOR_CONTENT_CLASS}`);
            const isQuillRendered = !!$editorContent.length;

            assert.expect(isQuillRendered ? 2 : 1);
            assert.strictEqual($element.attr('role'), 'application');

            if(isQuillRendered) {
                assert.strictEqual($editorContent.attr('role'), 'textbox');
            }
        });

        test('aria-label on textbox', function(assert) {
            const $htmlEditor = $('#htmlEditor').dxHtmlEditor();

            const $editorContent = $htmlEditor.find(`.${HTML_EDITOR_CONTENT_CLASS}`);
            const isQuillRendered = !!$editorContent.length;

            assert.expect(isQuillRendered ? 1 : 0);

            if(isQuillRendered) {
                assert.strictEqual($editorContent.attr('aria-label'), 'Editor content');
            }
        });

        test('Content of editor should have aria-invalid attribute when validationStatus is invalid', function(assert) {
            const $htmlEditor = $('#htmlEditor').dxHtmlEditor({
                validationStatus: 'invalid',
            });

            const $editorContent = $htmlEditor.find(`.${HTML_EDITOR_CONTENT_CLASS}`);
            const isQuillRendered = !!$editorContent.length;

            assert.expect(isQuillRendered ? 1 : 0);

            if(isQuillRendered) {
                assert.strictEqual($editorContent.attr('aria-invalid'), 'true');
            }
        });
    });

    QUnit.module('Props from global config', {
        beforeEach() {
            config({
                editorStylingMode: 'filled',
            });
        },
        afterEach() {
            config({
                editorStylingMode: 'outlined',
            });
        }
    }, () => {

        test('editorStylingMode should be applyed', function(assert) {
            const $element = $('#htmlEditor').dxHtmlEditor({
                value: 'Test'
            });

            assert.strictEqual($element.hasClass(HTML_EDITOR_OUTLINED_CLASS), false, 'has no old styling mode class');
            assert.strictEqual($element.hasClass(HTML_EDITOR_FILLED_CLASS), true, 'has new styling mode class');
        });
    });
}
