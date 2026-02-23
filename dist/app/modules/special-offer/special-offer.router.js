"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialOfferRouter = void 0;
const express_1 = require("express");
const special_offer_controller_1 = require("./special-offer.controller");
const router = (0, express_1.Router)();
router
    .route('/')
    .post(special_offer_controller_1.SpecialOfferController.createSpecialOffer)
    .get(special_offer_controller_1.SpecialOfferController.getAllSpecialOffers);
router
    .route('/:id')
    .get(special_offer_controller_1.SpecialOfferController.getSingleSpecialOffer)
    .put(special_offer_controller_1.SpecialOfferController.editSpecialOffer)
    .delete(special_offer_controller_1.SpecialOfferController.deleteSpecialOffer);
exports.SpecialOfferRouter = router;
