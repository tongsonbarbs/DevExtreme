/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { dxElementWrapper } from '@js/core/renderer';
import $ from '@js/core/renderer';
import type { Message, User } from '@js/ui/chat';
import type { WidgetOptions } from '@js/ui/widget/ui.widget';

import Widget from '../widget';
import MessageGroup from './chat_message_group';

const CHAT_MESSAGE_LIST_CLASS = 'dx-chat-message-list';
const CHAT_MESSAGE_LIST_CONTENT_CLASS = 'dx-chat-message-list-content';

export interface MessageListOptions extends WidgetOptions<MessageList> {
  items?: Message[];
  currentUserId?: number | string;
}

class MessageList extends Widget<MessageListOptions> {
  _messageGroups?: MessageGroup[];

  private _$content?: dxElementWrapper;

  _getDefaultOptions(): MessageListOptions {
    return {
      ...super._getDefaultOptions(),
      items: [],
      currentUserId: undefined,
    };
  }

  _init(): void {
    super._init();

    this._messageGroups = [];
  }

  _initMarkup(): void {
    $(this.element()).addClass(CHAT_MESSAGE_LIST_CLASS);

    super._initMarkup();

    this._renderMessageListContent();
  }

  _isCurrentUser(id): boolean {
    const { currentUserId } = this.option();

    return currentUserId === id;
  }

  _messageGroupAlignment(id): 'start' | 'end' {
    return this._isCurrentUser(id) ? 'end' : 'start';
  }

  _createMessageGroupComponent(items, userId): void {
    if (!this._$content) {
      return;
    }

    const $messageGroup = $('<div>').appendTo(this._$content);

    const options = {
      items,
      alignment: this._messageGroupAlignment(userId),
    };

    const messageGroup = this._createComponent($messageGroup, MessageGroup, options);

    this._messageGroups?.push(messageGroup);
  }

  _renderMessageListContent(): void {
    const { items } = this.option();

    this._$content = $('<div>')
      .addClass(CHAT_MESSAGE_LIST_CONTENT_CLASS)
      .appendTo(this.element());

    if (!items?.length) {
      return;
    }

    let currentMessageGroupUserId = items[0]?.author?.id;
    let currentMessageGroupItems: Message[] = [];

    items.forEach((item, index) => {
      const id = item?.author?.id;

      if (id === currentMessageGroupUserId) {
        currentMessageGroupItems.push(item);
      } else {
        this._createMessageGroupComponent(currentMessageGroupItems, currentMessageGroupUserId);

        currentMessageGroupUserId = id;
        currentMessageGroupItems = [];
        currentMessageGroupItems.push(item);
      }

      if (items.length - 1 === index) {
        this._createMessageGroupComponent(currentMessageGroupItems, currentMessageGroupUserId);
      }
    });
  }

  _renderMessage(message: Message, newItems: Message[], sender: User): void {
    this._setOptionWithoutOptionChange('items', newItems);

    const lastMessageGroup = this._messageGroups?.[this._messageGroups.length - 1];

    if (lastMessageGroup) {
      const lastMessageGroupUserId = lastMessageGroup.option('items')[0].author?.id;

      if (sender.id === lastMessageGroupUserId) {
        lastMessageGroup._renderMessage(message);

        return;
      }
    }

    this._createMessageGroupComponent([message], sender.id);
  }

  _clean(): void {
    this._messageGroups = [];

    super._clean();
  }

  _optionChanged(args: Record<string, unknown>): void {
    const { name } = args;

    switch (name) {
      case 'items':
      case 'currentUserId':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}

export default MessageList;
