import Factura from "../models/Factura.js"
import DetalleFactura from "../models/DetalleFactura.js"

export const crearFactura = async(req, res) => {

    const transaccion = await Factura.sequelize.transaction()
    
    try {
        const porcentajeIVA = 0.15
        let subtotal = 0
        let impuestos = 0
        let total = 0

        const {usuarioId} = req.user
        const {pacienteId, citaId, detalles, estado} = req.body

        if (!detalles || detalles.length === 0 || !Array.isArray(detalles)) {
            return res.status(400).json({ message: "Se requieren detalles para generar la factura" })
        }

        const estados = ["Pendiente", "Pagada", "Anulada"]

        const estado_encontrado = estados.find(x => x.toLowerCase().trim() === estado.toLowerCase().trim())

        const factura = Factura.build({
            usuarioId,
            pacienteId,
            citaId,
            estado: estado_encontrado
        })

        await factura.save({transaction: transaccion})


        for (const item of detalles) {
            const sub = item.precio_unitario * item.cantidad
            subtotal += sub

            const detalle = DetalleFactura.build({
                facturaId: factura.facturaId,
                tratamientoId: item.tratamientoId,
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario,
                subtotal: sub
            })

            await detalle.save({transaction: transaccion})
        }

        // Calcular totales
        impuestos = subtotal * porcentajeIVA
        total = subtotal + impuestos
        
        // Actualizo valores de factura
        factura.subtotal = subtotal
        factura.impuestos = impuestos
        factura.total = total

        await factura.save({transaction: transaccion})

        await transaccion.commit()

        res.status(201).json({
            message: "Factura creada correctamente",
            factura
        })
        
    } catch(error) {
        await transaccion.rollback()
        res.status(500).json({message: `Error al crear la factura: ${error.message}`})
    }
}