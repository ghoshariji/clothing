import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id:"rzp_test_6Fsll3myRMs9xe", // Ensure environment variables are in all caps
  key_secret:"2ZxuxUnbMuIvBPz0avekYoh6",
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body)
    const { amount, currency } = body;

    const options = {
      amount: amount,
      currency: currency,
      receipt: 'rcp1',
    };

    const order = await razorpay.orders.create(options);
    console.log(order);

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
