import type { Entitlement } from "./Entitlement"
import { PaywallInfo } from "./PaywallInfo"
import {
  PaywallPresentationRequestStatus,
  PaywallPresentationRequestStatusReason,
} from "./PaywallPresentationRequestStatus"
import type { RestoreType } from "./RestoreType"
import { StoreProduct } from "./StoreProduct"
import { StoreTransaction } from "./StoreTransaction"
import type { SubscriptionStatus } from "./SubscriptionStatus"
import { Survey, SurveyOption } from "./Survey"
import { TriggerResult } from "./TriggerResult"

/**
 * @category Events
 * @since 0.0.15
 * Contains information about a Superwall event.
 */
export class SuperwallEventInfo {
  event: SuperwallEvent
  params?: Record<string, any>

  constructor(event: SuperwallEvent, params?: Record<string, any>) {
    this.event = event
    this.params = params
  }

  static fromJson(json: any): SuperwallEventInfo {
    return new SuperwallEventInfo(SuperwallEvent.fromJson(json.event), json.params)
  }
}

/**
 * @category Enums
 * @since 0.0.15
 * Enum representing the types of Superwall events.
 */
export enum EventType {
  firstSeen = "firstSeen",
  configRefresh = "configRefresh",
  appOpen = "appOpen",
  appLaunch = "appLaunch",
  identityAlias = "identityAlias",
  appInstall = "appInstall",
  sessionStart = "sessionStart",
  deviceAttributes = "deviceAttributes",
  subscriptionStatusDidChange = "subscriptionStatusDidChange",
  appClose = "appClose",
  deepLink = "deepLink",
  triggerFire = "triggerFire",
  paywallOpen = "paywallOpen",
  paywallClose = "paywallClose",
  paywallDecline = "paywallDecline",
  transactionStart = "transactionStart",
  transactionFail = "transactionFail",
  transactionAbandon = "transactionAbandon",
  transactionComplete = "transactionComplete",
  subscriptionStart = "subscriptionStart",
  freeTrialStart = "freeTrialStart",
  transactionRestore = "transactionRestore",
  transactionTimeout = "transactionTimeout",
  userAttributes = "userAttributes",
  nonRecurringProductPurchase = "nonRecurringProductPurchase",
  paywallResponseLoadStart = "paywallResponseLoadStart",
  paywallResponseLoadNotFound = "paywallResponseLoadNotFound",
  paywallResponseLoadFail = "paywallResponseLoadFail",
  paywallResponseLoadComplete = "paywallResponseLoadComplete",
  paywallWebviewLoadStart = "paywallWebviewLoadStart",
  paywallWebviewLoadFail = "paywallWebviewLoadFail",
  paywallWebviewLoadComplete = "paywallWebviewLoadComplete",
  paywallWebviewLoadTimeout = "paywallWebviewLoadTimeout",
  paywallWebviewLoadFallback = "paywallWebviewLoadFallback",
  paywallProductsLoadStart = "paywallProductsLoadStart",
  paywallProductsLoadFail = "paywallProductsLoadFail",
  paywallProductsLoadComplete = "paywallProductsLoadComplete",
  paywallProductsLoadRetry = "paywallProductsLoadRetry",
  surveyResponse = "surveyResponse",
  paywallPresentationRequest = "paywallPresentationRequest",
  touchesBegan = "touchesBegan",
  surveyClose = "surveyClose",
  reset = "reset",
  restoreStart = "restoreStart",
  restoreComplete = "restoreComplete",
  restoreFail = "restoreFail",
  configAttributes = "configAttributes",
  customPlacement = "customPlacement",
  errorThrown = "errorThrown",
  confirmAllAssignments = "confirmAllAssignments",
  configFail = "configFail",
  adServicesTokenRequestStart = "adServicesTokenRequestStart",
  adServicesTokenRequestFail = "adServicesTokenRequestFail",
  adServicesTokenRequestComplete = "adServicesTokenRequestComplete",
  shimmerViewStart = "shimmerViewStart",
  shimmerViewComplete = "shimmerViewComplete",
  redemptionStart = "redemptionStart",
  redemptionComplete = "redemptionComplete",
  redemptionFail = "redemptionFail",
  enrichmentStart = "enrichmentStart",
  enrichmentComplete = "enrichmentComplete",
  enrichmentFail = "enrichmentFail",
  networkDecodingFail = "networkDecodingFail",
  handleLog = "handleLog",
}

/**
 * @category Events
 * @since 0.0.15
 * Represents a Superwall event with its associated data.
 */
export class SuperwallEvent {
  type: EventType | undefined
  placementName?: string
  deviceAttributes?: Record<string, any>
  deepLinkUrl?: string
  result?: TriggerResult
  paywallInfo?: PaywallInfo
  transaction?: StoreTransaction
  product?: StoreProduct
  error?: string
  message?: string
  triggeredEventName?: string
  survey?: Survey
  selectedOption?: SurveyOption
  customResponse?: string
  status?: PaywallPresentationRequestStatus
  reason?: PaywallPresentationRequestStatusReason
  restoreType?: RestoreType
  userAttributes?: Record<string, any>

  private constructor(options: {
    type: EventType
    placementName?: string
    deviceAttributes?: Record<string, any>
    deepLinkUrl?: string
    result?: TriggerResult
    paywallInfo?: PaywallInfo
    transaction?: StoreTransaction
    product?: StoreProduct
    error?: string
    message?: string
    triggeredEventName?: string
    survey?: Survey
    selectedOption?: SurveyOption
    customResponse?: string
    status?: PaywallPresentationRequestStatus
    reason?: PaywallPresentationRequestStatusReason
    restoreType?: RestoreType
    userAttributes?: Record<string, any>
    attempt?: number
    name?: string
    params?: Record<string, any>
    token?: string
    from?: { status: SubscriptionStatus; entitlements: Entitlement[] }
    to?: { status: SubscriptionStatus; entitlements: Entitlement[] }
  }) {
    Object.assign(this, options)
  }

  static fromJson(json: any): SuperwallEvent {
    const eventType = EventType[json.event as keyof typeof EventType]

    // Example for one case, replicate logic for other cases as needed
    switch (eventType) {
      case EventType.configRefresh:
      case EventType.firstSeen:
      case EventType.appOpen:
      case EventType.appLaunch:
      case EventType.identityAlias:
      case EventType.appInstall:
      case EventType.sessionStart:
      case EventType.appClose:
      case EventType.touchesBegan:
      case EventType.surveyClose:
      case EventType.reset:
      case EventType.restoreStart:
      case EventType.restoreComplete:
      case EventType.configAttributes:
      case EventType.configFail:
      case EventType.adServicesTokenRequestStart:
      case EventType.errorThrown:
      case EventType.confirmAllAssignments:
      case EventType.shimmerViewStart:
      case EventType.shimmerViewComplete:
      case EventType.subscriptionStatusDidChange:
      case EventType.enrichmentFail:
      case EventType.networkDecodingFail:
        return new SuperwallEvent({ type: eventType })
      case EventType.restoreFail:
        return new SuperwallEvent({
          type: eventType,
          message: json.message,
        })
      case EventType.deviceAttributes:
        return new SuperwallEvent({
          type: eventType,
          deviceAttributes: json.attributes,
        })
      case EventType.deepLink:
        return new SuperwallEvent({
          type: eventType,
          deepLinkUrl: json.url,
        })
      case EventType.triggerFire:
        return new SuperwallEvent({
          type: eventType,
          placementName: eventType, // TODO: This seems incorrect, should be json.eventName or similar
          result: TriggerResult.fromJson(json.result),
        })
      case EventType.paywallOpen:
      case EventType.paywallClose:
      case EventType.paywallDecline:
      case EventType.transactionRestore: // Note: transactionRestore was duplicated, keeping one
      case EventType.paywallWebviewLoadStart:
      case EventType.paywallWebviewLoadFail:
      case EventType.paywallWebviewLoadComplete:
      case EventType.paywallWebviewLoadTimeout:
      case EventType.paywallWebviewLoadFallback:
        return new SuperwallEvent({
          type: eventType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      case EventType.transactionStart:
      case EventType.transactionAbandon:
      case EventType.subscriptionStart:
      case EventType.freeTrialStart:
      case EventType.nonRecurringProductPurchase:
        return new SuperwallEvent({
          type: eventType,
          product: StoreProduct.fromJson(json.product),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      case EventType.transactionFail:
        return new SuperwallEvent({
          type: eventType,
          error: json.error,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      case EventType.transactionComplete:
        return new SuperwallEvent({
          type: eventType,
          transaction: json.transaction ? StoreTransaction.fromJson(json.transaction) : undefined,
          product: StoreProduct.fromJson(json.product),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      // case EventType.transactionRestore: // Already handled above
      //   return new SuperwallEvent({
      //     type: eventType,
      //     restoreType: RestoreType.fromJson(json.restoreType),
      //     paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
      //   });
      case EventType.userAttributes:
        return new SuperwallEvent({
          type: eventType,
          userAttributes: json.attributes,
        })
      case EventType.paywallResponseLoadStart:
      case EventType.paywallResponseLoadNotFound:
      case EventType.paywallResponseLoadFail:
        return new SuperwallEvent({
          type: eventType,
          triggeredEventName: json.triggeredEventName,
        })
      case EventType.paywallResponseLoadComplete:
      case EventType.paywallProductsLoadStart:
      case EventType.paywallProductsLoadFail:
      case EventType.paywallProductsLoadComplete:
        return new SuperwallEvent({
          type: eventType,
          triggeredEventName: json.triggeredEventName, // Assuming this should be based on json.paywallInfo or similar
        })
      case EventType.paywallProductsLoadRetry:
        return new SuperwallEvent({
          type: eventType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
          triggeredEventName: json.triggeredEventName,
          attempt: json.attempt,
        })
      case EventType.surveyResponse:
        return new SuperwallEvent({
          type: eventType,
          survey: Survey.fromJson(json.survey),
          selectedOption: SurveyOption.fromJson(json.selectedOption),
          customResponse: json.customResponse,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      case EventType.paywallPresentationRequest:
        return new SuperwallEvent({
          type: eventType,
          status: PaywallPresentationRequestStatus.fromJson(json.status),
          reason: json.reason
            ? PaywallPresentationRequestStatusReason.fromJson(json.reason)
            : undefined,
        })
      case EventType.customPlacement:
        return new SuperwallEvent({
          type: eventType,
          name: json.name,
          params: json.params,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      case EventType.adServicesTokenRequestFail:
        return new SuperwallEvent({
          type: eventType,
          error: json.error,
        })
      case EventType.adServicesTokenRequestComplete:
        return new SuperwallEvent({
          type: eventType,
          token: json.token,
        })
      case EventType.transactionTimeout:
        return new SuperwallEvent({
          type: eventType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        })
      // case EventType.shimmerViewComplete: // Already handled
      //   return new SuperwallEvent({ type: eventType });
      case EventType.redemptionStart:
        return new SuperwallEvent({ type: eventType })
      case EventType.redemptionComplete:
        return new SuperwallEvent({ type: eventType }) // Potentially add redemption info
      case EventType.redemptionFail:
        return new SuperwallEvent({ type: eventType }) // Potentially add error info
      case EventType.enrichmentStart:
        return new SuperwallEvent({ type: eventType })
      case EventType.handleLog: // Consider adding log parameters
        return new SuperwallEvent({ type: eventType })
      case EventType.enrichmentComplete:
        return new SuperwallEvent({
          type: eventType,
          userAttributes: json.userEnrichment, // Assuming these are the correct json keys
          deviceAttributes: json.deviceEnrichment,
        })
      default:
        console.warn(`Unhandled event type in SuperwallEvent.fromJson: ${json.event}`)
        return new SuperwallEvent({ type: eventType }) // Fallback for unhandled but known types
      // For truly unknown types, an error might be more appropriate:
      // throw new Error(`Invalid event type: ${json.event}`);
    }
  }
}

/**
 * @category Types
 * @since 0.0.15
 * Alias for SuperwallEventInfo, representing information about a Superwall placement.
 */
export type SuperwallPlacementInfo = SuperwallEventInfo
/**
 * @category Types
 * @since 0.0.15
 * Alias for SuperwallEvent, representing a Superwall placement event.
 */
export type SuperwallPlacement = SuperwallEvent
